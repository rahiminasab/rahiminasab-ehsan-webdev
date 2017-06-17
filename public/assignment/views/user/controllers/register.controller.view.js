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

            var error = false;
            if(username === null || username ==='' || typeof username === 'undefined') {
                model.message = 'username is required!';
                return;
            }
            if(password1 !== null && password1 !== '' && typeof password1 !== 'undefined' && password1 === password2) {
                UserService
                    .findUserByUsername(username)
                    .then(
                        function (user) {
                            model.message = "user " + username + " already exists!";
                            error = true;
                        },
                        function (notFound) {
                            var newUser = {
                                username: username,
                                password: password1
                            };
                            return UserService
                                .register(newUser);
                        }
                    ).then(
                        function (user) {
                            if(!error) {
                                $location.url('/profile');
                            }

                        },
                        function (err) {
                            model.message = "cannot register user " + username;
                        }
                     );
            } else {
                model.message = "passwords do not match or are empty!";
            }

        }
    }
})();