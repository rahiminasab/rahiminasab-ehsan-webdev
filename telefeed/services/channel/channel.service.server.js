/**
 * Created by ehsan on 6/15/17.
 */

var app = require('../../../express');

var ChannelModel = require('../../models/channel/channel.model.server');

app.post('/api/telefeed/channel/find', getChannelsByIds);
app.get('/api/telefeed/channel', findChannels);
app.get('/api/telefeed/channel/:channelId', findChannelById);
app.put('/api/telefeed/channel/:channelId', updateChannel);
app.delete('/api/telefeed/channel/:channelId', deleteChannel);

function getChannelsByIds(req, res) {
    var channelIds = req.body;
    ChannelModel
        .getChannelsByIds(channelIds)
        .then(
            function (channels) {
                if(channels)
                    res.json(channels);
            },
            function (err) {
                res.sendStatus(404);
            }
        )
}

function findChannels(req, res) {

    var titleKeyword = req.query['title'];
    if(titleKeyword)
        searchChannelsByTitle(req, res);
    else
        getAllChannels(req, res);
}


function searchChannelsByTitle(req, res) {

    var titleKeyword = req.query['title'];
    ChannelModel
        .findChannelsByTitle(titleKeyword)
        .then(
            function (channels) {
                if(channels) {
                    res.json(channels);
                } else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(500);
            }
        )
}

function getAllChannels(req, res) {

    ChannelModel
        .findAllChannels()
        .then(
            function (channels) {
                if(channels) {
                    res.json(channels);
                } else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(500);
            }
        );
}

function findChannelById(req, res) {

    var channelId = req.params['channelId'];
    ChannelModel
        .findChannelById(channelId)
        .then(
            function (channel) {
                if(channel) {
                    res.json(channel);
                } else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(500);
            }
        );
}

function updateChannel(req, res) {

    var channelId = req.params['channelId'];
    var channel = req.body;
    ChannelModel
        .updateChannel(channelId, channel)
        .then(
            function (success) {
                res.sendStatus(200);
            },
            function (err) {
                res.sendStatus(500);
            }
        );

}

function deleteChannel(req, res) {

    var channelId = req.params['channelId'];
    ChannelModel
        .removeChannel(channelId)
        .then(
            function (success) {
                res.sendStatus(200);
            },
            function (err) {
                res.sendStatus(500);
            }
        );
}