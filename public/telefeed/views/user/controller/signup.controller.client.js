/**
 * Created by ehsan on 6/24/17.
 */
(function () {
    angular
        .module('TeleFeed')
        .controller('SignupController', SignupController);

    function SignupController($location, UserService) {
        var model = this;
        model.signUp = signUp;

        function init() {
            model.user = {};
        }
        init();

        function signUp(userObj) {
            UserService
                .register(userObj)
                .then(
                    function (user) {
                        if(user) {
                            $location.url('/');
                        }
                        else {
                            model.error = 'cannot signup at this moment';
                        }
                    },
                    function (err) {
                        model.error = 'cannot signup at this moment';
                    }
                )
        }

    }
})();