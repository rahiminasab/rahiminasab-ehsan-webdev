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
            var found = UserService.findUserByCredentials(username, password);

            if(found !== null) {
                //model.message = "welcome " + username;
                $location.url('/user/' + found._id)
            } else {
                model.message = "user " + username + " not found!";
            }
        }
    }
})();