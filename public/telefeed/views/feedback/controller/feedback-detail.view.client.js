/**
 * Created by ehsan on 6/18/17.
 */
(function () {
    angular
        .module('TeleFeed')
        .controller('FeedbackDetailController', FeedbackDetailController);

    function FeedbackDetailController($location, $routeParams,
                                      FeedbackService, PostService, ChannelService, UserService, CurrentUser) {
        var model = this;
        model.postComment = postComment;
        model.loadComment = loadComment;
        model.bookmarkChannel = bookmarkChannel;
        model.commentAuthors = {};
        model.bckUrl = '#!/channel/' + $routeParams['channelId'] + '/post/' + $routeParams['postId'];

        function init() {
            if(!CurrentUser._id) {
                model.anonymView = true;
            }
            var feedbackId = $routeParams['feedbackId'];
            initFeedback(feedbackId);
            initComments(feedbackId);

        }
        init();

        function initFeedback(feedbackId) {
            FeedbackService
                .getFeedbackById(feedbackId)
                .then(
                    function (feedback) {
                        model.feedback = feedback;
                        model.postId = feedback._post;
                        return PostService
                            .findPostById(model.postId);
                    }
                ).then(
                    function (post) {
                        var channelId = post._channel;
                        return ChannelService
                            .findChannelById(channelId);
                    }
                ).then(
                    function (channel) {
                        model.channel = channel;
                        if(CurrentUser._id) {
                            return UserService
                                .getBookmarkedChannels()
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

        function initComments(feedbackId) {

            FeedbackService
                .getFeedbackForFeedback(feedbackId)
                .then(
                    function (comments) {
                        model.comments = comments;
                        for(var c in comments) {
                            var authorId = comments[c]._author;
                            if(authorId)
                                UserService
                                    .findUserById(authorId)
                                    .then(
                                        function (author) {
                                            model.commentAuthors[author._id] = author.username;
                                        }
                                    )
                        }
                    }
                );
        }

        function postComment(comment) {
            var feedback = {
                text: comment
            };
            FeedbackService
                .createFeedbackForFeedback(model.postId, model.feedback._id, feedback)
                .then(
                    function (success) {
                        if(success) {
                            $('#comment-bar')
                                .val('');
                            initComments(model.feedback._id);
                        }
                    }
                )
        }

        function loadComment(commentId) {
            $location.url('/channel/' + $routeParams['channelId'] + '/post/' + $routeParams['postId'] + '/feedback/' + commentId);
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
})();