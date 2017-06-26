/**
 * Created by ehsan on 6/18/17.
 */
var mongoose = require('mongoose');

var TeleFeedUserSchema = mongoose.Schema({
    username: String,
    password: String,
    fullname: String,
    phone: Number,
    email: String,
    photo_url: String,
    bookmarked_channels: [{type: mongoose.Schema.ObjectId, ref: 'ChannelModel'}],
    bookmarked_posts: [{type: mongoose.Schema.ObjectId, ref: 'PostModel'}],
    following: [{type: mongoose.Schema.ObjectId, ref: 'TeleFeedUserModel'}],
    facebook: {
        id:    String,
        token: String
    },
    roles: [{type: String,
        default: 'USER',
        enum:['USER', 'ADMIN', 'ROOT']}],
    creationDate: {type: Date, default: Date.now()}
}, {collection: 'project_user'});

module.exports = TeleFeedUserSchema;