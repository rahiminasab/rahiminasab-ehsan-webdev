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
                controllerAs: 'model',
                resolve: {
                    CurrentUser: checkCurrentUser,
                    Admin: checkAdmin
                }
            })
            .when('/signup', {
                templateUrl: 'views/user/template/signup.view.client.html',
                controller: 'SignupController',
                controllerAs: 'model',
                resolve: {
                    CurrentUser: checkCurrentUser
                }
            })
            .when('/login', {
                templateUrl: 'views/user/template/login.view.client.html',
                controller: 'LoginController',
                controllerAs: 'model',
                resolve: {
                    CurrentUser: checkCurrentUser
                }
            })
            .when('/profile', {
                templateUrl : 'views/user/template/profile.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'model',
                resolve: {
                    CurrentUser: checkLoggedIn,
                    Admin: checkAdmin
                }
            })
            .when('/profile/edit', {
                templateUrl : 'views/user/template/profile-edit.view.client.html',
                controller: 'ProfileEditController',
                controllerAs: 'model',
                resolve: {
                    CurrentUser: checkLoggedIn,
                    Admin: checkAdmin
                }
            })
            .when('/user/:username', {
                templateUrl : 'views/user/template/profile.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'model',
                resolve: {
                    CurrentUser: checkCurrentUser,
                    Admin: checkAdmin
                }
            })
            .when('/user/:username/edit', {
                templateUrl : 'views/user/template/profile-edit.view.client.html',
                controller: 'ProfileEditController',
                controllerAs: 'model',
                resolve: {
                    CurrentUser: checkCurrentUser,
                    Admin: checkAdmin
                }
            })
            .when('/channel', {
                templateUrl: 'views/channel/template/channel-list.view.client.html',
                controller: 'ChannelListController',
                controllerAs: 'model',
                resolve: {
                    CurrentUser: checkCurrentUser
                }
            })
            .when('/channel/:channelId', {
                templateUrl: 'views/post/template/post-list.view.client.html',
                controller: 'PostListController',
                controllerAs: 'model',
                resolve: {
                    CurrentUser: checkCurrentUser,
                    Admin: checkAdmin
                }
            })
            .when('/channel/:channelId/post/:postId', {
                templateUrl: 'views/post/template/post-detail.view.client.html',
                controller: 'PostDetailController',
                controllerAs: 'model',
                resolve: {
                    CurrentUser: checkCurrentUser
                }
            })
            .when('/channel/:channelId/post/:postId/feedback/:feedbackId', {
                templateUrl: 'views/feedback/template/feedback-detail-view.client.html',
                controller: 'FeedbackDetailController',
                controllerAs: 'model',
                resolve: {
                    CurrentUser: checkCurrentUser
                }
            })
            .when('/admin', {
                templateUrl: 'views/admin/template/admin.view.client.html',
                controller: 'AdminController',
                controllerAs: 'model',
                resolve: {
                    CurrentUser: adminLoggedIn
                }
            })
            .when('/admin/user', {
                templateUrl: 'views/admin/template/admin-users.view.client.html',
                controller: 'AdminUsersController',
                controllerAs: 'model',
                resolve: {
                    CurrentUser: adminLoggedIn
                }
            })
            .when('/admin/channel', {
                templateUrl: 'views/admin/template/admin-channels.view.client.html',
                controller: 'AdminChannelsController',
                controllerAs: 'model',
                resolve: {
                    CurrentUser: adminLoggedIn
                }
            });

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

        function checkAdmin(UserService, $q) {
            var deferred = $q.defer();
            UserService
                .checkAdmin()
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

        function adminLoggedIn(UserService, $q, $location) {
            var deferred = $q.defer();
            UserService
                .checkAdmin()
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
    }

})();