/**
 * Created by ehsan on 5/22/17.
 */
(function () {
    angular
        .module('WAM',['ngRoute'])
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html'
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/user/:userId', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website', {
                templateUrl : 'views/website/templates/website-list.view.client.html',
                controller: 'WebsiteListController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/new', {
                templateUrl : 'views/website/templates/website-new.view.client.html',
                controller: 'WebsiteNewController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId', {
                templateUrl : 'views/website/templates/website-edit.view.client.html',
                controller: 'WebsiteEditController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page', {
                templateUrl : 'views/page/templates/page-list.view.client.html',
                controller: 'PageListController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/new', {
                templateUrl : 'views/page/templates/page-new.view.client.html',
                controller: 'PageNewController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId', {
                templateUrl : 'views/page/templates/page-edit.view.client.html',
                controller: 'PageEditController',
                controllerAs: 'model'
            })
    }

})();