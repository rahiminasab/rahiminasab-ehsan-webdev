/**
 * Created by ehsan on 6/18/17.
 */
(function () {
    angular
        .module('TeleFeed')
        .controller('PostDetailController', PostDetailController);

    function PostDetailController($location, $routeParams, CurrentUser,
                                  UserService, ChannelService, PostService, FeedbackService) {
        var model = this;
        model.postFeedback = postFeedback;
        model.loadFeedback = loadFeedback;
        model.getDate = getDate;
        model.getAuthorUsername = getAuthorUsername;
        model.bookmarkChannel = bookmarkChannel;
        model.feedbackAuthors = {};
        model.bckUrl = '#!/channel/' + $routeParams['channelId'];

            function init() {

            if(!CurrentUser._id) {
                model.anonymView = true;
            } else {
                model.userBMChannels = CurrentUser.bookmarked_channels;
            }

            var postId = $routeParams['postId'];
            initPost(postId);
            initFeedback(postId);



        }
        init();

        function initPost(postId) {
            PostService
                .findPostById(postId)
                .then(
                    function (post) {
                        model.post = post;
                        return ChannelService
                            .findChannelById(post._channel);
                    }
                ).then(
                    function (channel) {
                        if(channel) {
                            model.channel = channel;
                            model.bckUrl = '#!/channel/' + channel._id;
                        }

                    }
                )
        }

        function initFeedback(postId) {

            FeedbackService
                .getFeedbackForPost(postId)
                .then(
                    function (comments) {
                        model.feedback = comments;

                        for(var c in comments) {
                            var authodId = comments[c]._author;
                            if(authodId)
                                UserService
                                    .findUserById(authodId)
                                    .then(
                                        function (author) {
                                            if(author)
                                                model.feedbackAuthors[author._id] = author.username;
                                        }
                                    )
                        }
                    }
                );
        }

        function postFeedback(comment) {
            if(CurrentUser) {
                var feedback = {
                    text: comment
                };
                FeedbackService
                    .createFeedbackForPost(model.post._id, feedback)
                    .then(
                        function (success) {
                            initFeedback(model.post._id);
                        }
                    )
            }
        }

        function loadFeedback(feedbackId) {
            $location.url('/channel/'+ $routeParams['channelId'] + '/post/' + $routeParams['postId'] + '/feedback/' + feedbackId);
        }

        function getDate(longFormat) {
            return new Date(longFormat * 1000)
        }

        function getAuthorUsername(authorId) {
            if(!authorId)
                return 'Anonymous';
            UserService
                .findUserById(authorId)
                .then(
                    function (user) {
                        if(user)
                            return user.username;
                    }
                )
        }

        function bookmarkChannel(channelId) {
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
})();