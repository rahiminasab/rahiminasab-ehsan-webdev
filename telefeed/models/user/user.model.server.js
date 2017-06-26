/**
 * Created by ehsan on 6/18/17.
 */

var mongoose = require('mongoose');
var UserSchema = require('./user.schema.server');
var UserModel = mongoose.model('TeleFeedUserModel', UserSchema);

UserModel.createUser = createUser;
UserModel.findUserById = findUserById;
UserModel.findAllUsers = findAllUsers;
UserModel.getUsersByIds = getUsersByIds;
UserModel.findUserByUsername = findUserByUsername;
UserModel.findUserByCredentials = findUserByCredentials;
UserModel.updateUser = updateUser;
UserModel.removeUser = removeUser;
UserModel.bookmarkChannel = bookmarkChannel;
UserModel.unbookmarkChannel = unbookmarkChannel;
UserModel.bookmarkPost = bookmarkPost;
UserModel.unbookmarkPost = unbookmarkPost;
UserModel.follow = follow;
UserModel.unfollow = unfollow;
UserModel.findUserByFacebookId = findUserByFacebookId;

module.exports = UserModel;

function createUser(userObj) {
    if(!userObj.roles ) {
        userObj.roles = ['USER'];
    } else if(userObj.roles.indexOf('USER') < 0) {
        userObj.roles.push('USER');
    }

    return UserModel
        .create(userObj);
}

function findUserById(userId) {
    return UserModel
        .findById(userId);
}

function findAllUsers() {
    return UserModel
        .find();
}

function getUsersByIds(userIds) {
    return UserModel
        .find({_id: {$in:userIds}});
}

function findUserByUsername(username) {
    return UserModel
        .findOne({username: username});
}

function findUserByCredentials(username, password) {
    return UserModel
        .findOne({username: username, password: password});
}

function updateUser(userId, user) {
    delete user.username;
    return UserModel
        .update({_id: userId}, {$set: user});
}

function removeUser(userId) {
    return UserModel
        .remove({_id: userId});
}

function bookmarkChannel(userId, channelId) {
    return UserModel
        .findUserById(userId)
        .then(
            function (user) {
                user.bookmarked_channels.push(channelId);
                return user.save();
            }
        )
}

function unbookmarkChannel(userId, channelId) {
    return UserModel
        .findUserById(userId)
        .then(
            function (user) {
                var index = user.bookmarked_channels.indexOf(channelId);
                user.bookmarked_channels.splice(index, 1);
                return user.save();
            }
        )
}

function bookmarkPost(userId, postId) {
    return UserModel
        .findUserById(userId)
        .then(
            function (user) {
                user.bookmarked_posts.push(postId);
                return user.save();
            }
        )
}

function unbookmarkPost(userId, postId) {
    return UserModel
        .findUserById(userId)
        .then(
            function (user) {
                var index = user.bookmarked_posts.indexOf(postId);
                user.bookmarked_posts.splice(index, 1);
                return user.save();
            }
        )
}

function follow(userId, followingUserId) {
    return UserModel
        .findUserById(userId)
        .then(
            function (user) {
                user.following.push(followingUserId);
                return user.save();
            }
        )
}

function unfollow(userId, followingUserId) {
    return UserModel
        .findUserById(userId)
        .then(
            function (user) {
                var index = user.following.indexOf(followingUserId);
                user.following.splice(index, 1);
                return user.save();
            }
        )
}

function findUserByFacebookId(fscebookId) {
    return UserModel
        .findOne({'facebook.id': fscebookId});
}

