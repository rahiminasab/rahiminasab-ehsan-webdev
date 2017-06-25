/**
 * Created by ehsan on 6/18/17.
 */

var app = require('../../../express');
var bcrypt = require("bcrypt-nodejs");
var multer = require('multer');
var upload = multer({ dest: __dirname+'/../../../public/telefeed/uploads'});
app.post('/api/telefeed/upload/pp', upload.single('pic'), uploadProfilePicture);

var UserModel = require('../../models/user/user.model.server');

app.post("/api/telefeed/user", createUser);
app.get("/api/telefeed/user/:userId", findUserById);
app.get("/api/telefeed/user", findAllUsers);
app.put("/api/telefeed/user/:userId", updateUser);
app.delete("/api/telefeed/user/:userId", removeUser);
app.post('/api/telefeed/register', register);
app.delete('/api/telefeed/unregister', unregister);

app.post("/api/telefeed/follow", follow);
app.post("/api/telefeed/following/find", getFollowingUsersByIds);
app.post("/api/telefeed/unfollow", unfollow);

app.get("/api/telefeed/bookmark/channel", getBookmarkedChannels);
app.post("/api/telefeed/channel/:channelId/bookmark", bookmarkChannel);
app.post("/api/telefeed/post/:postId/bookmark", bookmarkPost);
app.delete("/api/telefeed/channel/:channelId/unbookmark", unbookmarkChannel);
app.delete("/api/telefeed/post/:postId/unbookmark", unbookmarkPost);

function createUser(req, res) {
    var userObj = req.body;
    userObj.password = bcrypt.hashSync(userObj.password);
    return UserModel
        .createUser(userObj)
        .then(
            function (user) {
                if(user)
                    res.json(user);
                else
                    res.sendStatus(500);
            }
        )
}

function findUserById(req, res) {
    var userId = req.params['userId'];
    return UserModel
        .findUserById(userId)
        .then(
            function (user) {
                if(user)
                    res.json(user);
                else
                    res.sendStatus(404);
            }
        )
}

function findAllUsers(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    if(username && password) {
        findUserByCredentials(req, res);
    } else if(username) {
        findUserByUsername(req, res);

    } else {
        return UserModel
            .findAllUsers()
            .then(
                function (users) {
                    if(users)
                        res.json(users);
                    else
                        res.sendStatus(404);
                }
            )
    }
}

function findUserByUsername(req, res) {
    var username = req.query['username'];
    UserModel
        .findUserByUsername(username)
        .then(
            function (user) {
                if(user)
                    res.json(user);
                else
                    res.sendStatus(404);
            }
        );
}

function findUserByCredentials(req, res){
    var username = req.query['username'];
    var password = req.query['password'];

    UserModel
        .findUserByCredentials(username, password)
        .then(
            function (user) {
                if(user) {
                    res.send(user);
                }
                else {
                    res.sendStatus(404);
                }
            }, function (err) {
            }
        );
}

function updateUser(req, res) {
    var userId = req.params['userId'];
    var user = req.body;
    UserModel
        .updateUser(userId, user)
        .then(
            function (success) {
                if(success) {
                    res.sendStatus(200);
                }
                else {
                    res.sendStatus(500);
                }
            }, function (err) {
                res.sendStatus(500);
            }
        );
}

function removeUser(req, res) {
    var userId = req.params['userId'];

    UserModel
        .removeUser(userId)
        .then(
            function (success) {
                res.sendStatus(200);
            },
            function (err) {
                res.sendStatus(500);
            }
        );
}

function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    UserModel
        .createUser(user)
        .then(
            function (user) {
                req
                    .login(user, function (err) {
                        if(err)
                            res.sendStatus(401);
                        else
                            res.sendStatus(200);
                    })
            }
        )
}

function unregister(req, res) {
    UserModel
        .removeUser(req.user._id)
        .then(
            function (user) {
                req.logout();
                res.sendStatus(200);
            }
        )
}



function follow(req, res) {
    var followingUsername = req.body.follow;
    var followerUser = req.user;
    return UserModel
        .findUserByUsername(followingUsername)
        .then(
            function (user) {
                if(user)
                    return UserModel
                        .follow(followerUser._id, user);
            }
        ).then(
            function (success) {
                if(success)
                    res.sendStatus(200);
                else
                    res.sendStatus(500);
            },
            function (err) {
                res.sendStatus(500);
            }
        )
}

function getFollowingUsersByIds(req, res) {
    var userIds = req.body;
    UserModel
        .getUsersByIds(userIds)
        .then(
            function (users) {
                if(users)
                    res.json(users);
            },
            function (err) {
                res.sendStatus(404);
            }
        )
}

function unfollow(req, res) {
    var followingUsername = req.body.unfollow;
    var followerUser = req.user;
    return UserModel
        .findUserByUsername(followingUsername)
        .then(
            function (user) {
                if(user)
                    return UserModel
                        .unfollow(followerUser._id, user);
            }
        ).then(
            function (success) {
                if(success)
                    res.sendStatus(200);
                else
                    res.sendStatus(500);
            },
            function (err) {
                res.sendStatus(500);
            }
        )
}



function bookmarkChannel(req, res) {
    var channelId = req.params['channelId'];
    var user = req.user;
    return UserModel
        .bookmarkChannel(user._id, channelId)
        .then(
            function (success) {
                if(success)
                    res.sendStatus(200);
                else
                    res.sendStatus(500);
            },
            function (err) {
                res.sendStatus(500);
            }
        )
}

function getBookmarkedChannels(req, res) {
    if(req.user) {
        var userId = req.user._id;
        UserModel
            .findUserById(userId)
            .then(
                function (user) {
                    res.json(user.bookmarked_channels);
                },
                function (err) {
                    res.sendStatus(404);
                }
            )
    } else {
        res.sendStatus(404);
    }
}

function bookmarkPost(req, res) {
    var postId = req.params['postId'];
    var user = req.user;
    return UserModel
        .bookmarkPost(user._id, postId)
        .then(
            function (success) {
                if(success)
                    res.sendStatus(200);
                else
                    res.sendStatus(500);
            },
            function (err) {
                res.sendStatus(500);
            }
        )
}

function unbookmarkChannel(req, res) {
    var channelId = req.params['channelId'];
    var user = req.user;
    return UserModel
        .unbookmarkChannel(user._id, channelId)
        .then(
            function (success) {
                if(success)
                    res.sendStatus(200);
                else
                    res.sendStatus(500);
            },
            function (err) {
                res.sendStatus(500);
            }
        )
}

function unbookmarkPost(req, res) {
    var postId = req.params['postId'];
    var user = req.user;
    return UserModel
        .unbookmarkPost(user._id, postId)
        .then(
            function (success) {
                if(success)
                    res.sendStatus(200);
                else
                    res.sendStatus(500);
            },
            function (err) {
                res.sendStatus(500);
            }
        )
}

function uploadProfilePicture(req, res) {
    var userId = req.user._id;
    var photo = req.file;
    var filename = photo.filename;

    UserModel
        .findUserById(userId)
        .then(
            function (user) {
                if(user) {
                    user.photo_url = '/telefeed/uploads/'+filename;
                    return UserModel
                        .updateUser(userId, user);
                }
            }
        )
        .then(
            function (ok) {
                var callbackUrl   = "/telefeed/#!/profile/edit";
                res.redirect(callbackUrl);
            }
        )
}