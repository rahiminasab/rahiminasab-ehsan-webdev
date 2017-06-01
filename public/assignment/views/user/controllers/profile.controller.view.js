/**
 * Created by ehsan on 5/22/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('ProfileController', ProfileController);

    function ProfileController($location, $routeParams, UserService) {

        var model = this;

        model.updateProfile = updateProfile;
        model.unregister = unregister;

        model.userId = $routeParams['userId'];

        function init() {
            UserService
                .findUserById(model.userId)
                .then(
                    function (user) {
                        model.user = user;
                    },
                    function (err) {
                        model.error = "Unknown user request!"
                    }
                )
        }

        init();

        function updateProfile() {
            UserService
                .updateUser(model.userId, model.user)
                .then(
                    function(success){
                        model.message = "Your profile has been updated successfully!"
                    },
                    function(err){
                        model.error = "The profile cannot be updated!"
                    });
        }

        function unregister() {
            UserService
                .deleteUser(model.userId)
                .then(
                    function (success) {
                        $location.url("/login")
                    },
                    function (err) {
                        model.error = "cannot unregister user!"
                    }
                );
        }

    }

})();