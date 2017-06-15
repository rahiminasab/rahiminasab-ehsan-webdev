/**
 * Created by ehsan on 5/22/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('LoginController', LoginController);

    function LoginController($location, UserService) {

        var model = this;

        model.login = login;

        function login(username, password) {

            if(username === null || username ==='' || typeof username === 'undefined') {
                model.message = null;
                model.error = 'username cannot be empty!';
                return;
            }
            if(password === null || password ==='' || typeof password === 'undefined') {
                model.message = null;
                model.error = 'password cannot be empty!';
                return;
            }

            UserService
                .login(username, password)
                .then(
                    function (user) {
                        $location.url('/profile');
                    },
                    function (err) {
                        model.error = null;
                        model.message = "user " + username + " not found!";
                    }
                );
        }
    }
})();