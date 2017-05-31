/**
 * Created by ehsan on 5/22/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('RegisterController', RegisterController);

    function RegisterController($location, UserService) {

        var model = this;

        model.register = register;

        function register(username, password1, password2) {

            if(username === null || username ==='' || typeof username === 'undefined') {
                model.message = 'username is required!';
                return;
            }
            if(password1 !== null && password1 !== '' && typeof password1 !== 'undefined' && password1 === password2) {
                var found = false;
                UserService
                    .findUserByUsername(username)
                    .then(
                        function (res) {
                            found = true;
                        },
                        function (err) {

                        }
                    );
                if(!found) {
                    var user = {username: username, password: password1};
                    UserService
                        .createUser(user)
                        .then(
                            function (res) {
                                var newUser = res.data;
                                $location.url('/user/' + newUser._id);
                            },
                            function (err) {
                                model.message = "cannot register user " + username;
                            }
                        );
                } else {
                    model.message = "user " + username + " already exists!";
                }

            } else {
                model.message = "passwords do not match or are empty!";
            }

        }
    }
})();