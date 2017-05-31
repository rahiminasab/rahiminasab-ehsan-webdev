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

        model.userId = $routeParams['userId'];

        function init() {
            UserService
                .findUserById(model.userId)
                .then(
                    function (res) {
                        model.user = res.data;
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
                    function(res){
                        model.message = "Your profile has been updated successfully!"
                    },
                    function(err){
                        model.error = "The profile cannot be updated!"
                    });
        }

    }

})();