/**
 * Created by ehsan on 6/13/17.
 */
var mongoose = require('mongoose');
var ChannelSchema = require('./channel.schema.server');
var ChannelModel = mongoose.model('ChannelModel', ChannelSchema);

ChannelModel.createChannel       = createChannel;
ChannelModel.findChannelById     = findChannelById;
ChannelModel.findAllChannels     = findAllChannels;
ChannelModel.findChannelsByTitle = findChannelsByTitle;
ChannelModel.updateChannel       = updateChannel;
ChannelModel.removeChannel       = removeChannel;

module.exports = ChannelModel;

function createChannel(channelObj) {
    return ChannelModel
        .create(channelObj);
}

function findChannelById(channelId) {
    return ChannelModel
        .findById(channelId);
}

function findAllChannels() {
    return ChannelModel
        .find();
}

function findChannelsByTitle(channelTitle) {
    return ChannelModel
        .find({title: channelTitle});
}

function updateChannel(channelId, channelObj) {
    return ChannelModel
        .update({_id: channelId}, {$set: channelObj});
}

function removeChannel(channelId) {
    return ChannelModel
        .remove({_id: channelId});
}