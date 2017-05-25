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
                if(UserService.findUserByUsername(username) === null) {
                    var user = {username: username, password: password1};
                    var newuser = UserService.createUser(user);
                    $location.url('/user/' + newuser._id);

                } else {
                    model.message = "user " + username + " already exists!";
                }

            } else {
                model.message = "passwords do not match or are empty!";
            }

        }
    }
})();