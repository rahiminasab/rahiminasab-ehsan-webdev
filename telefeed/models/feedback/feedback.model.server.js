/**
 * Created by ehsan on 6/13/17.
 */

var mongoose = require('mongoose');
var FeedbackSchema = require('./feedback.schema.server');
var FeedbackModel = mongoose.model('FeedbackModel', FeedbackSchema);

FeedbackModel.createFeedbackForPost      = createFeedbackForPost;
FeedbackModel.createFeedbackForFeedback  = createFeedbackForFeedback;
FeedbackModel.findFeedbackById           = findFeedbackById;
FeedbackModel.findAllPostFeedback        = findAllPostFeedback;
FeedbackModel.findAllFeedbackForFeedback = findAllFeedbackForFeedback;
FeedbackModel.updateFeedback             = updateFeedback;
FeedbackModel.removeFeedback             = removeFeedback;

module.exports = FeedbackModel;

function createFeedbackForPost(authorId, postId, feedbackObj) {
    feedbackObj._author = authorId;
    feedbackObj._post = postId;
    return FeedbackModel
        .create(feedbackObj);
}

function createFeedbackForFeedback(authorId, postId, parentFeedbackId, feedbackObj) {
    feedbackObj._author = authorId;
    feedbackObj._post = postId;
    feedbackObj._feedback = parentFeedbackId;
    return FeedbackModel
        .create(feedbackObj);
}

function findFeedbackById(feedbackId) {
    return FeedbackModel
        .findById(feedbackId);
}

function findAllPostFeedback(postId) {
    return FeedbackModel
        .find({ _post: postId, _feedback: { $exists: false} });
}

function findAllFeedbackForFeedback(feedbackId) {
    return FeedbackModel
        .find({_feedback: feedbackId});
}

function updateFeedback(feedbackId, feedbackObj) {
    return FeedbackModel
        .update({_id: feedbackId}, {$set: feedbackObj});
}

function removeFeedback(feedbackId) {
    return FeedbackModel
        .remove({_id: feedbackId});
}