/**
 * Created by ehsan on 6/13/17.
 */
var mongoose = require('mongoose');

var FeedbackSchema = mongoose.Schema({
    _post: {type: mongoose.Schema.ObjectId, ref: "ChannelPostModel"},
    _feedback: {type: mongoose.Schema.ObjectId, ref: "FeedbackModel"},
    _author: {type: mongoose.Schema.ObjectId, ref: "TeleFeedUserModel"},
    text: String,
    like: {type: Number, default: 0},
    dislike: {type: Number, default: 0},
    creationDate: {type: Date, default: Date.now()}

}, {collection: 'project_feedback'});

module.exports = FeedbackSchema;