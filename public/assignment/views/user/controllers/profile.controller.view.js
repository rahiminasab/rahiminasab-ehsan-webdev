/**
 * Created by ehsan on 5/22/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('ProfileController', ProfileController);

    function ProfileController($location, UserService, currentUser) {

        var model = this;

        model.updateProfile = updateProfile;
        model.unregister = unregister;
        model.logout = logout;

        model.userId = currentUser._id;//$routeParams['userId'];

        function init() {
            model.user = currentUser;
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

        function logout() {
            UserService
                .logout()
                .then(
                    function (res) {
                        $location.url('/login');
                    }

        )
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