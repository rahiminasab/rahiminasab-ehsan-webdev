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
                UserService
                    .getBookmarkedChannels()
                    .then(
                        function (bookmarkedChannels) {

                            if(bookmarkedChannels) {
                                model.bookmarkedChannels = bookmarkedChannels;
                                model.channelFavIconMap = {};
                                for(var c in model.channels) {
                                    var channel = model.channels[c];
                                    var isBookmarked = (model.bookmarkedChannels.indexOf(channel._id) > -1);
                                    if(isBookmarked)
                                        model.channelFavIconMap[channel._id] = ['gold', 'fa fa-star'];
                                    else
                                        model.channelFavIconMap[channel._id] = ['black', 'fa fa-star-o'];
                                }
                            }
                        }
                    )
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
            $location.url('/channel/' + model.channel._id +'/post/' + postId);
        }

        function getDate(longFormat) {
            return new Date(longFormat * 1000)
        }

        function bookmarkChannel(channelId) {
            var index = model.bookmarkedChannels.indexOf(channelId);
            if(index < 0) {
                UserService
                    .bookmarkChannel(channelId)
                    .then(
                        function (success) {
                            init();
                        }
                    )
            } else {
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