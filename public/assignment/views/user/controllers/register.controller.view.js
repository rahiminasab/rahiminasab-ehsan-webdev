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
            if(password1 === password2) {
                if(UserService.findUserByUsername(username) === null) {
                    var user = {_id: ""+Math.floor((Math.random() * 100) + 1), username: username, password: password1};
                    UserService.createUser(user);
                    $location.url('/user/' + user._id);

                } else {
                    model.message = "user " + username + " already exists!";
                }

            } else {
                model.message = "passwords do not match!";
            }

        }
    }
})();