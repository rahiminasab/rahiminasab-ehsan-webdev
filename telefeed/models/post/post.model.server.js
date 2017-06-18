/**
 * Created by ehsan on 6/13/17.
 */
var mongoose = require('mongoose');
var ChannelPostSchema = require('./post.schema.server');
var ChannelPostModel = mongoose.model('ChannelPostModel', ChannelPostSchema);

ChannelPostModel.createPost             = createPost;
ChannelPostModel.findPostById           = findPostById;
ChannelPostModel.findAllPosts           = findAllPosts;
ChannelPostModel.findAllChannelPosts    = findAllChannelPosts;
ChannelPostModel.findChannelPostsByText = findChannelPostsByText;
ChannelPostModel.updateChannelPost      = updateChannelPost;
ChannelPostModel.removeChannelPost      = removeChannelPost;

module.exports = ChannelPostModel;

function createPost (postObj) {
    return ChannelPostModel
        .create(postObj);
}

function findPostById(postId) {
    return ChannelPostModel
        .findById(postId);
}

function findAllPosts() {
    return ChannelPostModel
        .find();
}

function findAllChannelPosts(channelId) {
    return ChannelPostModel
        .find({_channel: channelId});
}

function findChannelPostsByText(queryString) {
    return ChannelPostModel
        .find({text: { "$regex": queryString, "$options": "i" }});
}

function updateChannelPost(postId, postObj) {
    return ChannelPostModel
        .update({_id: postId}, {$set: postObj});
}

function removeChannelPost(postId) {
    return ChannelPostModel
        .remove({_id: postId});
}