/**
 * Created by ehsan on 5/22/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('ProfileController', ProfileController);

    function ProfileController($location, $routeParams, UserService) {

        var model = this;

        var userId = $routeParams['userId'];

        model.user = UserService.findUserById(userId);

        model.userId = userId;

        model.updateProfile = updateProfile;

        function updateProfile() {
            var success = UserService.updateUser(userId, model.user);
            if(success)
                model.message = "profile has been updated successfully!";
            else
                model.message = "profile update error";
        }

    }

})();