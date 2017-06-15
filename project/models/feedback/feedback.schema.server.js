/**
 * Created by ehsan on 6/13/17.
 */
var mongoose = require('mongoose');

var FeedbackSchema = mongoose.Schema({
    _post: {type: mongoose.Schema.ObjectId, ref: "ChannelPostModel"},
    _feedback: {type: mongoose.Schema.ObjectId, ref: "FeedbackModel"},
    text: String,
    like: Number,
    dislike: Number,
    creationDate: {type: Date, default: Date.now()}

}, {collection: 'project_feedback'});

module.exports = FeedbackSchema;