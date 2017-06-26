/**
 * Created by ehsan on 6/24/17.
 */
(function () {
    angular
        .module('TeleFeed')
        .controller('PostListController', PostListController);

    function PostListController($location, $routeParams,
                                UserService, ChannelService, PostService, CurrentUser, Admin) {
        var model = this;
        model.loadPost = loadPost;
        model.getDate = getDate;
        model.bookmarkChannel = bookmarkChannel;
        model.softDelete = softDelete;
        model.admin = Admin;
        model.bckUrl = '#!/channel';

        function init() {
            var channelId = $routeParams['channelId'];

            if(!CurrentUser._id) {
                model.anonymView = true;
            }

            ChannelService
                .findChannelById(channelId)
                .then(
                    function (channel) {
                        if(channel) {
                            model.channel = channel;
                            return PostService
                                .getChannelPosts(channelId);
                        }
                    }
                ).then(
                    function (posts) {
                        if(posts) {
                            model.posts = posts;
                            if(CurrentUser._id) {
                                return UserService
                                    .getBookmarkedChannels()
                            }
                        }
                    }
                ).then(
                    function (bookmarkedChannels) {
                        if(bookmarkedChannels) {
                            model.bookmarkedChannels = bookmarkedChannels;

                            if(model.bookmarkedChannels.indexOf(model.channel._id) > -1) {
                                $('#channel-fav-icon-in-full-row')
                                    .removeClass('fa-star-o')
                                    .addClass('fa-star')
                                    .css('color', 'gold');
                            } else {
                                $('#channel-fav-icon-in-full-row')
                                    .removeClass('fa-star')
                                    .addClass('fa-star-o')
                                    .css('color', 'black');
                            }

                        }
                    }
                )
        }
        init();

        function loadPost(postId) {
            $location.url('/channel/' + model.channel._id + '/post/' + postId);
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

        function softDelete(channel) {
            ChannelService
                .deleteChannel(channel._id)
                .then(
                    function (success) {
                        $location.url('/admin/channel');
                    }
                )
        }

    }
})();