/**
 * Created by ehsan on 6/15/17.
 */

var app = require('../../express');

var PostModel = require('../models/post/post.model.server');

app.get('/api/telefeed/post', findAllPosts);
app.get('/api/telefeed/channel/:channelId/post', getChannelPosts);
app.get('/api/telefeed/post/:postId', findPostById);
app.put('/api/telefeed/post/:postId', updatePost);
app.delete('/api/telefeed/post/:postId', deletePost);

function findAllPosts(req, res) {
    var queryString = req.query['query'];
    if(queryString)
        queryPosts(req, res);
    else
        getAllPosts(req, res);
}

function queryPosts(req, res) {
    var queryString = req.query['query'];
    PostModel
        .findChannelPostsByText(queryString)
        .then(
            function (posts) {
                if(posts)
                    res.json(posts);
                else
                    res.sendStatus(404);
            },
            function (err) {
                res.sendStatus(500);
            }
        )
}

function getAllPosts(req, res) {

    PostModel
        .findAllPosts()
        .then(
            function (posts) {
                if(posts)
                    res.json(posts);
                else
                    res.sendStatus(404);
            },
            function (err) {
                res.sendStatus(500);
            }
        );
}

function getChannelPosts(req, res) {

    var channelId = req.params['channelId'];
    PostModel
        .findAllChannelPosts(channelId)
        .then(
            function (posts) {
                if(posts)
                    res.json(posts);
                else
                    res.sendStatus(404);
            },
            function (err) {
                res.sendStatus(500);
            }
        );
}

function findPostById(req, res) {

    var postId = req.params['postId'];
    PostModel
        .findPostById(postId)
        .then(
            function (post) {
                if(post)
                    res.json(post);
                else
                    res.sendStatus(404);
            },
            function (err) {
                res.sendStatus(500);
            }
        );
}

function updatePost(req, res) {

    var postId = req.params['postId'];
    var post = req.body;
    PostModel
        .updateChannelPost(postId, post)
        .then(
            function (success) {
                res.sendStatus(200);
            },
            function (err) {
                res.sendStatus(404);
            }
        );
}

function deletePost(req ,res) {

    var postId = req.params['postId'];
    PostModel
        .removeChannelPost(postId)
        .then(
            function (success) {
                res.sendStatus(200);
            },
            function (err) {
                res.sendStatus(404);
            }
        );
}