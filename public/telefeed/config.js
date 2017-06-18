/**
 * Created by ehsan on 6/17/17.
 */
(function () {
    angular
        .module('TeleFeed')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/home.html',
                controller: 'HomeController',
                controllerAs: 'model'/*,
                resolve: {
                    currentUser: checkCurrentUser
                }*/
            })
    }

})();