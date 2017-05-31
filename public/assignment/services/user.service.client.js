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

            return $http.post("/api/user", user);
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username=" + username)
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username=" + username + "&password=" + password);
        }

        function findUserById(userId) {
            return $http.get("/api/user/" + userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/user/" + userId, user);
        }
        
        function deleteUser(userId) {
            return $http.delete("/api/user/" + userId);
        }
    }
})();