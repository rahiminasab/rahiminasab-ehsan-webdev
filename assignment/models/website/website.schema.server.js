/**
 * Created by ehsan on 6/7/17.
 */
var mongoose = require('mongoose');

var WebsiteSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.ObjectId, ref: "UserModel"},
    name: String,
    description: String,
    creationDate: {type: Date, default: Date.now()},
    pages: [
        {type: mongoose.Schema.ObjectId, ref: 'PageModel'}
    ]
}, {collection: "assignment_website"});

module.exports = WebsiteSchema;