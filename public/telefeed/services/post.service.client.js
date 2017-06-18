/**
 * Created by ehsan on 6/17/17.
 */
(function () {
    angular
        .module('TeleFeed')
        .service('PostService', PostService);

    function PostService($http) {

        this.findAllPosts    = findAllPosts;
        this.getChannelPosts = getChannelPosts;
        this.findPostById = findPostById;
        this.updatePost   = updatePost;
        this.deletePost   = deletePost;

        function findAllPosts(searchTerm) {
            var url = 'api/telefeed/post';
            if(searchTerm)
                url += '?query=' + searchTerm;
            $http
                .get(url)
                .then(
                    function (response) {
                        return response.data;
                    }
                );
        }

        function getChannelPosts(channelId) {
            var url = '/api/telefeed/channel/' + channelId + '/post';
            $http
                .get(url)
                .then(
                    function (response) {
                        return response.data;
                    }
                );
        }

        function findPostById(postId) {
            var url = '/api/telefeed/post/' + postId;
            $http
                .get(url)
                .then(
                    function (response) {
                        return response.data;
                    }
                );
        }

        function updatePost(postId, post) {
            var url = '/api/telefeed/post/' + postId;
            $http
                .put(url, post)
                .then(
                    function (response) {
                        return response.data;
                    }
                );
        }

        function deletePost(postId) {
            var url = '/api/telefeed/post/' + postId;
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