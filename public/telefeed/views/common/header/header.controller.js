/**
 * Created by ehsan on 6/24/17.
 */
(function () {
    angular
        .module('TeleFeed')
        .controller('HeaderController', HeaderController);
    
    function HeaderController($scope, UserService, $location) {
        var model = this;
        model.logout = logout;

        function init() {
            model.bckUrl = $scope.$parent.model.bckUrl;
            UserService
                .loggedin()
                .then(
                    function (user) {
                        model.loggedIn = (user !== '0');
                    }
                );
        }
        init();

        function logout() {
            UserService
                .logout()
                .then(
                    function (res) {
                        init();
                        $location.url('/');
                    }

                )
        }
    }

})();