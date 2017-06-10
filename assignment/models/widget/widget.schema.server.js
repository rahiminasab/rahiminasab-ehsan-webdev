/**
 * Created by ehsan on 6/7/17.
 */
var mongoose = require('mongoose');

var WidgetSchema = mongoose.Schema({
    _page: {type: mongoose.Schema.ObjectId, ref: "PageModel"},
    orderIdx: Number,
    widgetType: String, //enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT'],
    name: String,
    text: String,
    placeholder: String,
    description: String,
    url: String,
    width: String,
    height: String,
    rows: Number,
    size: Number,
    class: String,
    icon: String,
    deletable: Boolean,
    formatted: Boolean,
    creationDate: {type: Date, default: Date.now()}
}, {collection: "assignment_widget"});

module.exports = WidgetSchema;