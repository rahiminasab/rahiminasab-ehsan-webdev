/**
 * Created by ehsan on 6/24/17.
 */
(function () {
    angular
        .module('TeleFeed')
        .controller('ProfileController', ProfileController);

    function ProfileController($routeParams, $location, UserService, CurrentUser, ChannelService, Admin) {
        var model = this;
        model.getUserImageUrl = getUserImageUrl;
        model.loadFavs = loadFavs;
        model.loadFollowing = loadFollowing;
        model.unbookmarkChannel = unbookmarkChannel;
        model.loadChannel = loadChannel;
        model.follow = follow;
        model.unfollow = unfollow;
        model.loadUser = loadUser;
        model.deleteUser = deleteUser;
        model.showAdminPanelForUser = showAdminPanelForUser;
        model.admin = Admin;
        if(model.admin._id) {
            model.bckUrl = '#!/admin/user';
        }

        function init() {

            var username = $routeParams['username'];
            if(username) {
                if(!CurrentUser || !CurrentUser.username)
                    model.anonymView = true;
                else if(CurrentUser.username !== username)
                    model.foreignView = true;

                UserService
                    .findUserByUsername(username)
                    .then(
                        function (user) {
                            if(user) {
                                model.user = user;
                                model.favoriteChannels = [];
                                handleFollowingIconFor(user);
                                ChannelService
                                    .getChannelsByIds(model.user.bookmarked_channels)
                                    .then(
                                        function (channels) {
                                            model.favoriteChannels = channels;
                                        }
                                    );
                                UserService
                                    .getFollowingUsersByIds(model.user.following)
                                    .then(
                                        function (users) {
                                            model.followingUsers = users;
                                        }
                                    );
                            }
                            else
                                model.error = 'cannot find user with username ' + username;
                        },
                        function (err) {
                            model.error = 'cannot find user with username ' + username;
                        }
                    )
            } else {
                if(!CurrentUser || !CurrentUser.username)
                    model.anonymView = true;
                model.user = CurrentUser;
                model.favoriteChannels = [];
                ChannelService
                    .getChannelsByIds(model.user.bookmarked_channels)
                    .then(
                        function (channels) {
                            model.favoriteChannels = channels;
                        }
                    );
                UserService
                    .getFollowingUsersByIds(model.user.following)
                    .then(
                        function (users) {
                            model.followingUsers = users;
                        }
                    );
            }

            model.showFavorites = true;
        }
        init();

        function getUserImageUrl() {
            if(model.user && model.user.photo_url) {
                return model.user.photo_url;
            } else {
                return '/telefeed/img/unknown-user-img.jpg';
            }
        }

        function loadFavs() {
            $('#favorites-btn')
                .removeClass('btn-default')
                .addClass('btn-primary');
            $('#following-btn')
                .removeClass('btn-primary')
                .addClass('btn-default');
            model.showFavorites = true;
        }

        function loadFollowing() {
            $('#following-btn')
                .removeClass('btn-default')
                .addClass('btn-primary');
            $('#favorites-btn')
                .removeClass('btn-primary')
                .addClass('btn-default');
            model.showFavorites = false;
        }

        function unbookmarkChannel(channelId) {
            UserService
                .unbookmarkChannel(channelId)
                .then(
                    function (success) {
                        var index = CurrentUser.bookmarked_channels.indexOf(channelId);
                        if(index > -1)
                            CurrentUser.bookmarked_channels.splice(index, 1);
                        init();
                    }
                )

        }

        function loadChannel(channelId) {
            $location.url('/channel/' + channelId);
        }

        function follow() {
            var username = $routeParams['username'];
            if(!username)
                return;
            UserService
                .findUserByUsername(username)
                .then(
                    function (visitingUser) {
                        if(visitingUser) {
                            var index = CurrentUser.following.indexOf(visitingUser._id);
                            if(index < 0) {
                                CurrentUser.following.push(visitingUser._id);
                                model._proceedToFollow = true;
                                return UserService
                                    .follow(username);
                            } else {
                                CurrentUser.following.splice(index, 1);
                                model._proceedToUnFollow = true;
                                return UserService
                                    .unfollow(username);
                            }
                        }
                    }
                ).then(
                    function (success) {
                        if(model._proceedToFollow) {
                            $('#follow-icon')
                                .removeClass('fa-bookmark-o')
                                .addClass('fa-bookmark')
                                .css('color', 'red');
                        } else if(model._proceedToUnFollow) {
                            $('#follow-icon')
                                .removeClass('fa-bookmark')
                                .addClass('fa-bookmark-o')
                                .css('color', 'black');
                        }
                    }
                )
        }

        function unfollow(userId, username) {
            var index = CurrentUser.following.indexOf(userId);
            CurrentUser.following.splice(index, 1);
            UserService
                .unfollow(username)
                .then(
                    function (success) {
                        if(success)
                            init();
                    }
                );
        }

        function handleFollowingIconFor(user) {
            if(!CurrentUser.following || (CurrentUser.following.indexOf(user._id) < 0)) {
                $('#follow-icon')
                    .removeClass('fa-bookmark')
                    .addClass('fa-bookmark-o')
                    .css('color', 'black');
            } else {
                $('#follow-icon')
                    .removeClass('fa-bookmark-o')
                    .addClass('fa-bookmark')
                    .css('color', 'red');
            }
        }

        function loadUser(username) {
            $location.url('/user/' + username);
        }

        function deleteUser() {
            var username = $routeParams['username'];
            if(username) {
                UserService
                    .findUserByUsername(username)
                    .then(
                        function (user) {
                            if(user) {
                                return UserService
                                    .removeUser(user._id);
                            }
                        }
                    ).then(
                        function (success) {
                            if(success)
                                $location.url('/admin/user');
                        }
                    )
            }
        }

        function showAdminPanelForUser() {
            if(!CurrentUser || !model.user || !model.admin) {
                return false;
            }
            if(CurrentUser.username === model.user.username) {
                return false;
            }
            if(model.admin.roles && model.admin.roles.indexOf('ROOT') > -1) {
                return true;
            }
            if(model.user && model.user.roles.indexOf('ADMIN') > -1) {
                return false;
            }
            if(model.user.roles.indexOf('ROOT') > -1) {
                return false;
            }
            if(model.admin._id && model.user.roles.indexOf('ADMIN') < 0) {
                return true;
            }
        }

    }
})();