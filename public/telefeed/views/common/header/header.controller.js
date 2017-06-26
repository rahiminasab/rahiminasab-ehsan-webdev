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
        //model.getProfileNameString = getProfileNameString;

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

        /*function getProfileNameString() {
            return 'Profile(' +$scope.$parent.model.user.username+')'
        }*/
    }

})();