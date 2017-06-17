/**
 * Created by ehsan on 6/15/17.
 */

var app = require('../../express');

var FeedbackModel = require('../models/feedback/feedback.model.server');

app.post('/api/telefeed/channel/:channelId/post/:postId/feedback/new', createFeedback);
app.get('/api/telefeed/channel/:channelId/post/:postId/feedback', getFeedbackForPost);
app.get('/api/telefeed/channel/:channelId/post/:postId/feedback/:feedbackId', getFeedbackById);
app.get('/api/telefeed/channel/:channelId/post/:postId/feedback/:feedbackId/feedback', getFeedbackForFeedback);
app.put('/api/telefeed/channel/:channelId/post/:postId/feedback/:feedbackId', updateFeedback);
app.delete('/api/telefeed/channel/:channelId/post/:postId/feedback/:feedbackId', deleteFeedback);

function createFeedback(req, res) {

}

function getFeedbackForPost(req, res) {

}

function getFeedbackById(req, res) {

}

function getFeedbackForFeedback(req, res) {

}

function updateFeedback(req, res) {

}

function deleteFeedback(req, res) {

}