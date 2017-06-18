/**
 * Created by ehsan on 6/15/17.
 */

var app = require('../../express');

var FeedbackModel = require('../models/feedback/feedback.model.server');

app.post('/api/telefeed/post/:postId/feedback/new', createFeedback);
app.get('/api/telefeed/post/:postId/feedback', getFeedbackForPost);
app.get('/api/telefeed/feedback/:feedbackId', getFeedbackById);
app.get('/api/telefeed/feedback/:feedbackId/feedback', getFeedbackForFeedback);
app.put('/api/telefeed/feedback/:feedbackId', updateFeedback);
app.delete('/api/telefeed/feedback/:feedbackId', deleteFeedback);

function createFeedback(req, res) {
    var feedback = req.body;
    FeedbackModel
        .createFeedback(feedback)
        .then(
            function (feedback) {
                if(feedback)
                    res.json(feedback);
                else
                    res.sendStatus(500);
            }, function (err) {
                res.sendStatus(500);
            }
        )
}

function getFeedbackForPost(req, res) {
    var postId = req.params['postId'];
    FeedbackModel
        .findAllPostFeedback(postId)
        .then(
            function (feedback) {
                if(feedback)
                    res.json(feedback);
                else
                    res.sendStatus(404);
            }, function (err) {
                res.sendStatus(500);
            }
        )
}

function getFeedbackById(req, res) {
    var feedbackId = req.params['feedbackId'];
    FeedbackModel
        .findFeedbackById(feedbackId)
        .then(
            function (feedback) {
                if(feedback)
                    res.json(feedback);
                else
                    res.sendStatus(404);
            }, function (err) {
                res.sendStatus(500);
            }
        )
}

function getFeedbackForFeedback(req, res) {
    var feedbackId = req.params['feedbackId'];
    FeedbackModel
        .findAllFeedbackForFeedback(feedbackId)
        .then(
            function (feedback) {
                if(feedback)
                    res.json(feedback);
                else
                    res.sendStatus(404);
            }, function (err) {
                res.sendStatus(500);
            }
        )
}

function updateFeedback(req, res) {
    var feedbackId = req.params['feedbackId'];
    var feedback = req.body;
    FeedbackModel
        .updateFeedback(feedbackId, feedback)
        .then(
            function (success) {
                if(success)
                    res.sendStatus(200);
                else
                    res.sendStatus(500);
            }, function (err) {
                res.sendStatus(500);
            }
        )
}

function deleteFeedback(req, res) {
    var feedbackId = req.params['feedbackId'];
    FeedbackModel
        .removeFeedback(feedbackId)
        .then(
            function (success) {
                if(success)
                    res.sendStatus(200);
                else
                    res.sendStatus(500);
            }, function (err) {
                res.sendStatus(500);
            }
        )
}