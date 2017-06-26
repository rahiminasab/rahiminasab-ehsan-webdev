/**
 * Created by ehsan on 6/13/17.
 */
var mongoose = require('mongoose');

var ChannelSchema = mongoose.Schema({
    telegram_id: String,
    title: String,
    author: String,
    importDate: {type: Date, default: Date.now()},
    deleted: {type: Boolean, default: false}

}, {collection: 'project_channel'});

module.exports = ChannelSchema;