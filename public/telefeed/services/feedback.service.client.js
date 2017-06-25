/**
 * Created by ehsan on 6/17/17.
 */
(function () {
    angular
        .module('TeleFeed')
        .service('FeedbackService', FeedbackService);

    function FeedbackService($http) {

        this.createFeedbackForPost = createFeedbackForPost;
        this.getFeedbackForPost    = getFeedbackForPost;
        this.getFeedbackById = getFeedbackById;
        this.createFeedbackForFeedback = createFeedbackForFeedback;
        this.getFeedbackForFeedback = getFeedbackForFeedback;
        this.updateFeedback   = updateFeedback;
        this.deleteFeedback   = deleteFeedback;

        function createFeedbackForPost(postId, feedback) {
            var url = '/api/telefeed/post/' + postId + '/feedback';
            return $http
                .post(url, feedback)
                .then(
                    function (response) {
                        return response.data;
                    }
                );
        }

        function getFeedbackForPost(postId) {
            var url = '/api/telefeed/post/' + postId + '/feedback';
            return $http
                .get(url)
                .then(
                    function (response) {
                        return response.data;
                    }
                );
        }

        function getFeedbackById(feedbackId) {
            var url = '/api/telefeed/feedback/' + feedbackId;
            return $http
                .get(url)
                .then(
                    function (response) {
                        return response.data;
                    }
                );
        }

        function createFeedbackForFeedback(postId, parentFeedbackId, feedback) {
            var url = '/api/telefeed/post/'+ postId +'/feedback/' + parentFeedbackId + '/feedback';
            return $http
                .post(url, feedback)
                .then(
                    function (response) {
                        return response.data;
                    }
                );
        }

        function getFeedbackForFeedback(feedbackId) {
            var url = '/api/telefeed/feedback/' + feedbackId + '/feedback';
            return $http
                .get(url)
                .then(
                    function (response) {
                        return response.data;
                    }
                );
        }

        function updateFeedback(feedbackId, feedback) {
            var url = '/api/telefeed/feedback/' + feedbackId;
            return $http
                .put(url, feedback)
                .then(
                    function (response) {
                        return response.data;
                    }
                );
        }

        function deleteFeedback(feedbackId) {
            var url = '/api/telefeed/feedback/' + feedbackId;
            return $http
                .delete(url)
                .then(
                    function (response) {
                        return response.data;
                    }
                );
        }
    }
})();