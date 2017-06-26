/**
 * Created by ehsan on 6/18/17.
 */
(function ($, viewport) {
    angular
        .module('TeleFeed')
        .controller('ChannelListController', ChannelListController);

    function ChannelListController($routeParams, $location, CurrentUser,
                                   ChannelService, PostService, UserService) {
        var model = this;

        model.loadPosts = loadPosts;
        model.loadPost = loadPost;
        model.getDate = getDate;
        model.bookmarkChannel =bookmarkChannel;
        model.bckUrl = '#!/';

        function init() {
            var query = $routeParams['q'];
            if(query) {
                ChannelService
                    .findChannels(query)
                    .then(
                        function (channels) {
                            if(channels)
                                model.channels = channels;
                        }
                    )
            } else {
                ChannelService
                    .findChannels()
                    .then(
                        function (channels) {
                            if(channels)
                                model.channels = channels;
                        }
                    )
            }
            if(CurrentUser._id) {
                model.userBMChannels = CurrentUser.bookmarked_channels;
            }
        }
        init();

        function loadPosts(channel) {
            model.channel = channel;
            if(viewport.is('<md'))
                $location.url('/channel/' + channel._id);
            else
                PostService
                    .getChannelPosts(channel._id)
                    .then(
                        function (posts) {
                            model.posts = posts;
                        }
                    )
        }

        function loadPost(postId) {
            $location.url('/channel/'+'/post/' + postId);
        }

        function getDate(longFormat) {
            return new Date(longFormat * 1000)
        }

        function bookmarkChannel(channelId) {
            if(!model.userBMChannels)
                return;
            var index = model.userBMChannels.indexOf(channelId);
            if(index < 0) {
                CurrentUser.bookmarked_channels.push(channelId);
                UserService
                    .bookmarkChannel(channelId)
                    .then(
                        function (success) {
                            init();
                        }
                    )
            } else {
                CurrentUser.bookmarked_channels.splice(index, 1);
                UserService
                    .unbookmarkChannel(channelId)
                    .then(
                        function (success) {
                            init();
                        }
                    )
            }

        }

    }


})(jQuery, ResponsiveBootstrapToolkit);