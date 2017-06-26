/**
 * Created by ehsan on 6/24/17.
 */
(function () {
    angular
        .module('TeleFeed')
        .controller('ProfileEditController', ProfileEditController);

    function ProfileEditController($routeParams, $location, UserService, CurrentUser, Admin) {
        var model = this;
        model.getUserImageUrl = getUserImageUrl;
        model.updateUser = updateUser;
        model.cancelEdit = cancelEdit;
        model.isAdminEditingUser = isAdminEditingUser;
        model.user = {};
        model.admin = Admin;

        function init() {
            var username = $routeParams['username'];
            if(username) {
                UserService
                    .findUserByUsername(username)
                    .then(
                        function (userObj) {
                            model.user = userObj;
                            model.rolesModel = {
                                admin: (userObj.roles.indexOf('ADMIN') > -1)
                            };
                        }
                    )
            } else {
                model.user = CurrentUser;
            }
            if($routeParams['username']) {
                model.bckUrl = '#!/user/' + username;
            } else {
                model.bckUrl = '#!/profile';
            }
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
            if(model.rolesModel.admin)
                userObj.roles.push('ADMIN');
            else {
                var index = userObj.roles.indexOf('ADMIN');
                if(index > -1)
                    userObj.roles.splice(index, 1);
            }
            UserService
                .updateUser(userObj._id, userObj)
                .then(
                    function (ok) {
                        var username = $routeParams['username'];
                        if(username) {
                            $location.url('/user/'+username);
                        } else {
                            $location.url('/profile');
                        }
                    },
                    function (err) {
                        model.error = 'cannot update user';
                    }
                )
        }

        function cancelEdit() {
            var username = $routeParams['username'];
            if(username) {
                $location.url('/user/'+username);
            } else {
                $location.url('/profile');
            }
        }

        function isAdminEditingUser() {
            return model.user.roles.indexOf('ADMIN') > -1;
        }
    }

})();