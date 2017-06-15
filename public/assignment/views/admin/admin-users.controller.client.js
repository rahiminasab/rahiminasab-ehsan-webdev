/**
 * Created by ehsan on 6/14/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('AdminUsersController', AdminUsersController);

    function AdminUsersController(UserService) {
        var model = this;
        model.deleteUser = deleteUser;

        function init() {
            UserService
                .findAllUsers()
                .then(
                    function (users) {
                        model.users = users;
                    }
                )

        }
        init();

        function deleteUser(user) {
            UserService
                .deleteUser(user._id)
                .then()
        }
    }
})();