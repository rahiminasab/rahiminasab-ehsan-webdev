/**
 * Created by ehsan on 6/17/17.
 */
(function () {
    angular
        .module('TeleFeed')
        .service('FeedbackService', FeedbackService);

    function FeedbackService($http) {

        this.createFeedback = createFeedback;
        this.getFeedbackForPost    = getFeedbackForPost;
        this.getFeedbackById = getFeedbackById;
        this.getFeedbackForFeedback = getFeedbackForFeedback;
        this.updateFeedback   = updateFeedback;
        this.deleteFeedback   = deleteFeedback;

        function createFeedback(postId, feedback) {
            var url = '/api/telefeed/post/' + postId + '/feedback/new';
            $http
                .post(url, feedback)
                .then(
                    function (response) {
                        return response.data;
                    }
                );
        }

        function getFeedbackForPost(postId) {
            var url = '/api/telefeed/post/' + postId + '/feedback';
            $http
                .get(url)
                .then(
                    function (response) {
                        return response.data;
                    }
                );
        }

        function getFeedbackById(feedbackId) {
            var url = '/api/telefeed/feedback/' + feedbackId;
            $http
                .get(url)
                .then(
                    function (response) {
                        return response.data;
                    }
                );
        }

        function getFeedbackForFeedback(feedbackId) {
            var url = '/api/telefeed/feedback/' + feedbackId + '/feedback';
            $http
                .get(url)
                .then(
                    function (response) {
                        return response.data;
                    }
                );
        }

        function updateFeedback(feedbackId, feedback) {
            var url = '/api/telefeed/feedback/' + feedbackId;
            $http
                .put(url, feedback)
                .then(
                    function (response) {
                        return response.data;
                    }
                );
        }

        function deleteFeedback(feedbackId) {
            var url = '/api/telefeed/feedback/' + feedbackId;
            $http
                .delete(url)
                .then(
                    function (response) {
                        return response.data;
                    }
                );
        }
    }
})();