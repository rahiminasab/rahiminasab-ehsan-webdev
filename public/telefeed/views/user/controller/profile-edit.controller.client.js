/**
 * Created by ehsan on 6/24/17.
 */
(function () {
    angular
        .module('TeleFeed')
        .controller('ProfileEditController', ProfileEditController);

    function ProfileEditController($location, UserService, CurrentUser) {
        var model = this;
        model.getUserImageUrl = getUserImageUrl;
        model.updateUser = updateUser;
        model.user = {};
        model.bckUrl = '#!/profile';

        function init() {
            model.user = CurrentUser;
        }
        init();

        function getUserImageUrl() {
            if(model.user && model.user.photo_url) {
                return model.user.photo_url;
            } else {
                return '/telefeed/img/unknown-user-img.jpg';
            }
        }

        function updateUser(userObj) {
            UserService
                .updateUser(userObj._id, userObj)
                .then(
                    function (ok) {
                        $location.url('/profile');
                    },
                    function (err) {
                        model.error = 'cannot update user';
                    }
                )
        }
    }

})();