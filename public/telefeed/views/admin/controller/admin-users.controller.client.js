/**
 * Created by ehsan on 6/14/17.
 */
(function () {
    angular
        .module('TeleFeed')
        .controller('AdminUsersController', AdminUsersController);

    function AdminUsersController(UserService, $location) {
        var model = this;
        model.showCreateNewUser = showCreateNewUser;
        model.hideCreateUser = hideCreateUser;
        model.createUser = createUser;
        model.bckUrl = '#!/admin';

        function init() {
            model.showNewUserForm = false;
            model.rolesModel = {
                admin: false
            };
            UserService
                .findAllUsers()
                .then(
                    function (users) {
                        model.users = users;
                    }
                )

        }
        init();

        function showCreateNewUser() {
            model.showNewUserForm = true;
        }

        function hideCreateUser() {
            model.showNewUserForm = false;
        }

        function createUser(userObj) {
            userObj.roles = [];
            if(model.rolesModel.admin)
                userObj.roles.push('ADMIN');
            UserService
                .createUser(userObj)
                .then(
                    function (user) {
                        init();
                    }
                )

        }
    }
})();