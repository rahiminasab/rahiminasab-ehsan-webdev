/**
 * Created by ehsan on 6/13/17.
 */
var mongoose = require('mongoose');
var ChannelSchema = require('./channel.schema.server');
var ChannelModel = mongoose.model('ChannelModel', ChannelSchema);

ChannelModel.createChannel            = createChannel;
ChannelModel.createChannelIfNotExists = createChannelIfNotExists;
ChannelModel.findChannelById          = findChannelById;
ChannelModel.getChannelsByIds         = getChannelsByIds;
ChannelModel.findAllChannels          = findAllChannels;
ChannelModel.findChannelsByTitle      = findChannelsByTitle;
ChannelModel.updateChannel            = updateChannel;
ChannelModel.removeChannel            = removeChannel;

module.exports = ChannelModel;

function createChannel(channelObj) {
    return ChannelModel
        .create(channelObj);
}

function createChannelIfNotExists(channelObj) {
    channelObj.deleted = false;
    return ChannelModel
        .findOneAndUpdate(
            {telegram_id: channelObj.telegram_id},
            channelObj,
            {upsert: true}
    );
}

function findChannelById(channelId) {
    return ChannelModel
        .findById(channelId);
}

function getChannelsByIds(channelIds) {
    return ChannelModel
        .find({_id: { $in: channelIds}, deleted: false});
}

function findAllChannels() {
    return ChannelModel
        .find({deleted: false});
}

function findChannelsByTitle(channelTitle) {
    //todo how to escape channelTitle?
    return ChannelModel
        .find({title: new RegExp('.*'+channelTitle, "i"), deleted: false});
}

function updateChannel(channelId, channelObj) {
    return ChannelModel
        .update({_id: channelId}, {$set: channelObj});
}

function removeChannel(channelId) {
    return ChannelModel
        .update({_id: channelId}, {$set: {deleted: true}});
}
