/**
 * Created by ehsan on 6/13/17.
 */
var mongoose = require('mongoose');

var ChannelPostSchema = mongoose.Schema({
    _channel: {type: mongoose.Schema.ObjectId, ref: "ChannelModel"},
    telegram_message_id: String,
    telegram_creation_date: Number,
    text: String,
    caption: String,
    like: {type: Number, default: 0},
    dislike: {type: Number, default: 0},
    photo: [{file_id: String, file_size: Number, width: Number, height: Number}],
    importDate: {type: Date, default: Date.now()}

}, {collection: 'project_channel_post'});

module.exports = ChannelPostSchema;