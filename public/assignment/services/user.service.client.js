/**
 * Created by ehsan on 5/22/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .factory('UserService', UserService);

    function UserService($http) {

        return {
            createUser:             createUser,
            findUserById:           findUserById,
            findUserByUsername:     findUserByUsername,
            findUserByCredentials:  findUserByCredentials,
            findAllUsers:           findAllUsers,
            updateUser:             updateUser,
            deleteUser:             deleteUser,
            login:                  login,
            loggedin:               loggedin,
            logout:                 logout,
            register:               register,
            unregister:             unregister,
            checkAdmin:             checkAdmin
        };

        function login(username, password) {
            var credentials = {
                username: username,
                password: password
            };

            return $http
                .post('/api/assignment/login', credentials)
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }

        function loggedin() {
            var url = "/api/assignment/loggedin";
            return $http.get(url)
                .then(
                    function (res) {
                        return res.data;
                    }
                )
        }

        function logout() {
            var url = "/api/assignment/logout";
            return $http.post(url)
                .then(
                    function (res) {
                        return res.data;
                    }
                )
        }

        function register(user) {
            var url = "/api/assignment/register";
            return $http
                .post(url, user)
                .then(
                    function (res) {
                        return res.data;
                    }
                )
        }

        function createUser(user) {

            return $http
                .post("/api/user", user)
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }

        function findUserByUsername(username) {
            return $http
                .get("/api/user?username=" + username)
                .then(
                    function (res) {
                        return res.data;
                    }
                )
        }

        function findUserByCredentials(username, password) {
            return $http
                .get("/api/user?username=" + username + "&password=" + password)
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }

        function findUserById(userId) {
            return $http
                .get("/api/user/" + userId)
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }

        function findAllUsers() {
            return $http.get("/api/user")
                .then(
                    function (res) {
                        return res.data;
                    }
                )
        }

        function updateUser(userId, user) {
            return $http
                .put("/api/user/" + userId, user)
                .then(
                    function (res) {
                        return true;
                    },
                    function (err) {
                        return false;
                    }
                );
        }
        
        function deleteUser(userId) {
            return $http
                .delete("/api/user/" + userId)
                .then(
                    function (res) {
                        return true;
                    },
                    function (err) {
                        return false;
                    }
                );
        }

        function unregister() {
            var url = "/api/assignment/unregister";
            return $http
                .post(url)
                .then(
                    function (res) {
                        return res.data;
                    }
                )
        }

        function checkAdmin() {
            var url = "/api/assignment/checkAdmin";
            return $http.get(url)
                .then(
                    function (res) {
                        return res.data;
                    }
                )
        }
    }
})();