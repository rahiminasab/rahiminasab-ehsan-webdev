/**
 * Created by ehsan on 5/22/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .factory('UserService', UserService);

    function UserService() {

        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            createUser:             createUser,
            findUserById:           findUserById,
            findUserByUsername:     findUserByUsername,
            findUserByCredentials:  findUserByCredentials,
            updateUser:             updateUser,
            deleteUser:             deleteUser
        };

        return api;

        function createUser(user) {
            if(findUserById(user._id) === null) {
                user._id = ""+Math.floor((Math.random() * 100) + 1);
                user.created = new Date();
                users.push(user);
                return user;
            }
            return null;

        }

        function findUserById(userId) {
            for(var u in users) {
                if(users[u]._id === userId)
                    return users[u];
            }
            return null;
        }
        
        function findUserByUsername(username) {
            var user = users.find(function (user) {
                return user.username === username;
            });

            if(typeof user === 'undefined') {
                return null;
            }
            return user;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                var user = users[u];
                if( user.username === username &&
                    user.password === password) {
                    return user;
                }
            }
            return null;
        }

        function updateUser(userId, user) {
            var index = null;
            for(var u in users) {
                if(users[u]._id === userId) {
                    index = u;
                    break;
                }
            }

            if(index !== null) {
                users.splice(index, 1);
                users.push(user);
                return true;
            }
            return false;
        }
        
        function deleteUser(userId) {
            var index = null;
            for(var u in users) {
                if(users[u]._id === userId) {
                    index = u;
                    break;
                }
            }

            if(index !== null) {
                users.splice(index, 1);
            }
        }
    }
})();