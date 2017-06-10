/**
 * Created by ehsan on 6/5/17.
 */

var mongoose = require('mongoose');
var UserSchema = require('./user.schema.server');
var UserModel = mongoose.model('UserModel', UserSchema);

UserModel.createUser = createUser;
UserModel.findUserById = findUserById;
UserModel.findAllUsers = findAllUsers;
UserModel.findUserByUsername = findUserByUsername;
UserModel.findUserByCredentials = findUserByCredentials;
UserModel.updateUser = updateUser;
UserModel.removeUser = removeUser;
UserModel.addWebsite = addWebsite;
UserModel.removeWebsite = removeWebsite;

module.exports = UserModel;

function createUser(user) {
    return UserModel
        .create(user);
}

function findUserById(userId) {
    return UserModel.findById(userId);
}

function findAllUsers() {
    return UserModel.find();
}

function findUserByUsername(username) {
    return UserModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return UserModel.findOne({username: username, password: password});
}

function updateUser(userId, user) {
    delete user.username;
    return UserModel.update({_id: userId}, {$set: user});
}

function removeUser(userId) {
    return UserModel.remove({_id: userId})
}

function addWebsite(userId, websiteId) {
    return UserModel
        .findUserById(userId)
        .then(
            function (user) {
                user.websites.push(websiteId);
                return user.save();
            }
        )
}

function removeWebsite(userId, websiteId) {
    return UserModel
        .findUserById(userId)
        .then(
            function (user) {
                var index = user.websites.indexOf(websiteId);
                user.websites.splice(index, 1);
                return user.save();
            }
        )
}