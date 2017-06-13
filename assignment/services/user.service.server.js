/**
 * Created by ehsan on 5/30/17.
 */
var app = require("../../express");

var UserModel = require("../models/user/user.model.server");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


app.post("/api/user", createUser);
app.get("/api/user", getUsers);
app.get("/api/user/:userId", findUserById);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);
app.post  ('/api/assignment/login', passport.authenticate('local'), login);
app.get('/api/assignment/loggedin', loggedin);
app.post('/api/assignment/logout', logout);
app.post('/api/assignment/register', register)

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
passport.use(new LocalStrategy(localStrategy));

function login(req, res) {
    res.json(req.user);
}

function loggedin(req, res) {
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function register(req, res) {
    var user = req.body;
    UserModel
        .createUser(user)
        .then(
            function (user) {
                req
                    .login(user, function (status) {
                        res.send(status);
                    })
            }
        )
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    UserModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function localStrategy(username, password, done) {
    UserModel
        .findUserByCredentials(username, password)
        .then(
            function(user) {
                if(user) {
                    if(user.username === username && user.password === password) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                }
                return done(null, false);
            },
            function(err) {
                if (err) { return done(err, false); }
            }
        );
}

////////////////////////////////////////USER MANAGEMENT

function createUser(req, res) {
    var user = req.body;

    UserModel
        .createUser(user)
        .then(
            function (user) {
                res.json(user);
            },
            function (err) {
                res.sendStatus(500);
            }
        );
}

function getUsers(req, res){
    var username = req.query['username'];
    var password = req.query['password'];
    if(username && password) {
        findUserByCredentials(req, res);
    } else if(username) {
        findUserByUsername(req, res);

    } else {
        findAllUsers(req, res);
    }
}

function findUserByUsername(req, res) {
    var username = req.query['username'];
    UserModel
        .findUserByUsername(username)
        .then(
            function (user) {
                if(user)
                    res.send(user);
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

function findUserById(req, res) {
    var userId = req.params['userId'];

    UserModel
        .findUserById(userId)
        .then(
            function (user) {
                if(user)
                    res.send(user);
                else
                    res.sendStatus(404);
            }
        );
}

function findAllUsers(req, res) {

    UserModel
        .findAllUsers()
        .then(
            function (users) {
                if(users)
                    res.send(users);
                else
                    res.sendStatus(404);
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
                console.log(success);
                if(success) {
                    res.sendStatus(200);
                }
                else {
                    res.sendStatus(500);
                }
            }, function (err) {
                console.log("err is: " + err)
            }
        );
}

function deleteUser(req, res) {
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