/**
 * Created by ehsan on 6/22/17.
 */
(function () {
    angular
        .module('TeleFeed')
        .service('UserService', UserService);

    function UserService($http) {
        this.createUser = createUser;
        this.findAllUsers = findAllUsers;
        this.findUserById = findUserById;
        this.getFollowingUsersByIds = getFollowingUsersByIds;
        this.findUserByUsername = findUserByUsername;
        this.updateUser = updateUser;
        this.removeUser = removeUser;
        this.register = register;
        this.unregister = unregister;

        this.follow = follow;
        this.unfollow = unfollow;
        this.bookmarkChannel = bookmarkChannel;
        this.getBookmarkedChannels = getBookmarkedChannels;
        this.bookmarkPost = bookmarkPost;
        this.unbookmarkChannel = unbookmarkChannel;
        this.unbookmarkPost= unbookmarkPost;

        this.login = login;
        this.loggedin = loggedin;
        this.checkAdmin = checkAdmin;
        this.logout = logout;

        function createUser(userObj) {
            return $http
                .post('/api/telefeed/user', userObj)
                .then(
                    function (response) {
                        if(response) {
                            return response.data;
                        }
                    }
                )
        }

        function findAllUsers() {
            return $http
                .get('/api/telefeed/user')
                .then(
                    function (response) {
                        if(response)
                            return response.data;
                    }
                )
        }

        function findUserById(userId) {
            return $http
                .get('/api/telefeed/user/' + userId)
                .then(
                    function (response) {
                        if(response)
                            return response.data;
                    }
                )
        }

        function getFollowingUsersByIds(userIds) {
            return $http
                .post('/api/telefeed/following/find', userIds)
                .then(
                    function (response) {
                        if(response)
                            return response.data;
                    }
                )
        }

        function findUserByUsername(username) {
            return $http
                .get('/api/telefeed/user?username=' + username)
                .then(
                    function (response) {
                        if(response)
                            return response.data;
                    }
                )
        }

        function updateUser(userId, userObj) {
            return $http
                .put('/api/telefeed/user/' + userId, userObj)
                .then(
                    function (response) {
                        if(response)
                            return response.data;
                    }
                )
        }

        function removeUser(userId) {
            return $http
                .delete('/api/telefeed/user/' + userId)
                .then(
                    function (response) {
                        if(response)
                            return response.data;
                    }
                )
        }

        function register(userObj) {
            return $http
                .post('/api/telefeed/register', userObj)
                .then(
                    function (response) {
                        if(response)
                            return response.data;
                    }
                )
        }


        function unregister() {
            return $http
                .delete('/api/telefeed/unregister')
                .then(
                    function (response) {
                        if(response)
                            return response.data;
                    }
                )
        }

        function follow(username) {
            return $http
                .post('/api/telefeed/follow',  {follow: username})
                .then(
                    function (response) {
                        if(response)
                            return response.data;
                    }
                )
        }

        function unfollow(username) {
            return $http
                .post('/api/telefeed/unfollow', {unfollow: username})
                .then(
                    function (response) {
                        if(response)
                            return response.data;
                    }
                )
        }

        function bookmarkChannel(channelId) {
            return $http
                .post('/api/telefeed/channel/' + channelId + '/bookmark')
                .then(
                    function (response) {
                        if(response)
                            return response.data;
                    }
                )
        }

        function getBookmarkedChannels() {
            return $http
                .get('/api/telefeed/bookmark/channel')
                .then(
                    function (response) {
                        if(response) {
                            return response.data;
                        }

                    }
                )
        }

        function bookmarkPost(postId) {
            return $http
                .post('/api/telefeed/post/' + postId + '/bookmark')
                .then(
                    function (response) {
                        if(response)
                            return response.data;
                    }
                )
        }

        function unbookmarkChannel(channelId) {
            return $http
                .delete('/api/telefeed/channel/' + channelId + '/unbookmark')
                .then(
                    function (response) {
                        if(response)
                            return response.data;
                    }
                )
        }

        function unbookmarkPost(postId) {
            return $http
                .delete('/api/telefeed/post/' + postId + '/unbookmark')
                .then(
                    function (response) {
                        if(response)
                            return response.data;
                    }
                )
        }



        function login(credentials) {
            return $http
                .post('/api/telefeed/login', credentials)
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }

        function loggedin() {
            return $http
                .get('/api/telefeed/loggedin')
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }

        function checkAdmin() {
            return $http.get('/api/telefeed/checkAdmin')
                .then(
                    function (res) {
                        return res.data;
                    }
                )
        }

        function logout() {
            return $http.post('/api/telefeed/logout')
                .then(
                    function (res) {
                        return res.data;
                    }
                )
        }
    }
})();