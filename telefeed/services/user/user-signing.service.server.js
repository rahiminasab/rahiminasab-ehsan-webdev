/**
 * Created by ehsan on 6/22/17.
 */
var app = require('../../../express');
var bcrypt = require("bcrypt-nodejs");
var UserModel = require('../../models/user/user.model.server');
var passport = require('passport');
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));

var FacebookStrategy = require('passport-facebook').Strategy;
var facebookConfig = {
    clientID     : process.env.FB_CLIENT_ID,
    clientSecret : process.env.FB_CLIENT_SECRETE,
    callbackURL  : process.env.FB_CALLBACK_URL,
    profileFields: ['id', 'emails', 'displayName']
};

passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

app.post  ('/api/telefeed/login', passport.authenticate('local'), login);
app.get ('/telefeed/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
app.get('/telefeed/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/telefeed/#!/profile',
        failureRedirect: '/telefeed/#!/login'
    }));

app.get('/api/telefeed/loggedin', loggedin);
app.get('/api/telefeed/checkAdmin', checkAdmin);
app.post('/api/telefeed/logout', logout);

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

function facebookStrategy(token, refreshToken, profile, done) {
    UserModel
        .findUserByFacebookId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var username = '';
                    var email = '';
                    if(!profile.emails || profile.emails.length === 0) {
                        email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        username = emailParts[0];
                    }
                    else {
                        username = Math.floor(Math.random()*1000000 + 1);
                    }


                    var newFacebookUser = {
                        username:  username,
                        fullname: profile.displayName,
                        email:     email,
                        facebook: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return UserModel.createUser(newFacebookUser);
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

