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
                .findUserByCredentials(username, password)
                .then(
                    function (res) {
                        var user = res.data;
                        $location.url('/user/' + user._id);
                    },
                    function (err) {
                        model.message = "user " + username + " not found!";
                    }
                );
        }
    }
})();