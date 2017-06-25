/**
 * Created by ehsan on 6/24/17.
 */
(function () {
    angular
        .module('TeleFeed')
        .controller('LoginController', LoginController);

    function LoginController($location, UserService) {
        var model = this;
        model.login = login;

        function init() {
            model.credentials = {};
        }
        init();

        function login(credentials) {
            UserService
                .login(credentials)
                .then(
                    function (success) {
                        if(success)
                            $location.url('/');
                        else
                            model.error = 'cannot login user ' + credentials.username;
                    },
                    function (err) {
                        model.error = 'cannot login user ' + credentials.username;
                    }
                )
        }
    }
})();