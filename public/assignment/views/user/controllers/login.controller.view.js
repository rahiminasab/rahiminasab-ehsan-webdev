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

            UserService
                .login(username, password)
                .then(
                    function (user) {
                        $location.url('/profile');
                    },
                    function (err) {
                        model.message = "user " + username + " not found!";
                    }
                );
        }
    }
})();