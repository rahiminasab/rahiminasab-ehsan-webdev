/**
 * Created by ehsan on 5/24/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/home.html',
                controller: 'mainController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'LoginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'RegisterController',
                controllerAs: 'model'
            })
            .when('/profile', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website', {
                templateUrl: 'views/website/templates/website-list.view.client.html',
                controller: 'WebsiteListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/new', {
                templateUrl: 'views/website/templates/website-new.view.client.html',
                controller: 'WebsiteNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:websiteId', {
                templateUrl: 'views/website/templates/website-edit.view.client.html',
                controller: 'WebsiteEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:websiteId/page', {
                 templateUrl : 'views/page/templates/page-list.view.client.html',
                 controller: 'PageListController',
                 controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:websiteId/page/new', {
                 templateUrl : 'views/page/templates/page-new.view.client.html',
                 controller: 'PageNewController',
                 controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:websiteId/page/:pageId', {
                 templateUrl : 'views/page/templates/page-edit.view.client.html',
                 controller: 'PageEditController',
                 controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:websiteId/page/:pageId/widget', {
                 templateUrl : 'views/widget/templates/widget-list.view.client.html',
                 controller: 'WidgetListController',
                 controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:websiteId/page/:pageId/widget/new', {
                 templateUrl : 'views/widget/templates/widget-chooser.view.client.html',
                 controller: 'WidgetNewController',
                 controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:websiteId/page/:pageId/widget/:widgetId', {
                 templateUrl : 'views/widget/templates/widget-edit.view.client.html',
                 controller: 'WidgetEditController',
                 controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:websiteId/page/:pageId/widget/:widgetId/flickrSearch', {
                templateUrl : 'views/widget/templates/components/widget-flickr-search.view.client.html',
                controller: 'FlickrImageSearchController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            });
    }

    function checkLoggedIn(UserService, $q, $location) {
        var deferred = $q.defer();
        UserService
            .loggedin()
            .then(
                function (user) {
                    if(user === '0') {
                        deferred.reject();
                        $location.url('/login');
                    } else {
                        deferred.resolve(user);
                    }
                }
            );
        return deferred.promise;
    }

    function checkCurrentUser(UserService, $q) {
        var deferred = $q.defer();
        UserService
            .loggedin()
            .then(
                function (user) {
                    if(user === '0') {
                        deferred.resolve({});
                    } else {
                        deferred.resolve(user);
                    }
                }
            );
        return deferred.promise;
    }
})();