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
            updateUser:             updateUser,
            deleteUser:             deleteUser
        };

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
    }
})();