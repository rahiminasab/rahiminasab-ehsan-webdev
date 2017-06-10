/**
 * Created by ehsan on 6/7/17.
 */
var mongoose = require('mongoose');

var PageSchema = mongoose.Schema({
    _website: {type: mongoose.Schema.ObjectId, ref: "WebsiteModel"},
    name: String,
    title: String,
    description: String,
    creationDate: {type: Date, default: Date.now()},
    widgets: [{type: mongoose.Schema.ObjectId, ref: "WidgetModel"}]
}, {collection: "assignment_page"});

module.exports = PageSchema;