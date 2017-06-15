/**
 * Created by ehsan on 5/30/17.
 */
var app = require("../../express");

var UserModel = require("../models/user/user.model.server");
var bcrypt = require("bcrypt-nodejs");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


app.post("/api/user", createUser);
//app.get("/api/user", isAdmin, getUsers);
app.get("/api/user", getUsers);
app.get("/api/user/:userId", findUserById);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);
app.post  ('/api/assignment/login', passport.authenticate('local'), login);
app.get('/api/assignment/loggedin', loggedin);
app.get('/api/assignment/checkAdmin', checkAdmin);
app.post('/api/assignment/logout', logout);
app.post('/api/assignment/register', register);
app.post('/api/assignment/unregister', unregister);

/*app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/assignment/#!/profile',
        failureRedirect: '/assignment/#!/login'
    }));*/

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/assignment/#!/profile',
        failureRedirect: '/assignment/#!/login'
    }));


passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
passport.use(new LocalStrategy(localStrategy));

/*var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL
};*/
var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};

//passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
passport.use(new GoogleStrategy(googleConfig, googleStrategy));


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

function checkAdmin(req, res) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {

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
    user.password = bcrypt.hashSync(user.password);
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

function unregister(req, res) {
    UserModel
        .removeUser(req.user._id)
        .then(
            function (user) {
                req.logout(user, function (status) {
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
        .findUserByUsername(username)
        .then(
            function(user) {
                // if the user exists, compare passwords with bcrypt.compareSync
                if(user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            },
            function(err) {
                if (err) { return done(err, false); }
            }
        );
}

/*function facebookStrategy(token, refreshToken, profile, done) {
    UserModel
        .findUserByFacebookId(profile.id)
        .then(

        );
}*/
function googleStrategy(token, refreshToken, profile, done) {
    UserModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return UserModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

////////////////////////////////////////USER MANAGEMENT

function isAdmin(req, res, next) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        next();
    } else {
        res.sendStatus(401);
    }
}

function createUser(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
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