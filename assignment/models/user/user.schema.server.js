/**
 * Created by ehsan on 6/5/17.
 */

var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    creationDate: {type: Date, default: Date.now()},
    websites: [
        {type: mongoose.Schema.ObjectId, ref: 'WebsiteModel'}
    ]
}, {collection: 'assignment_user'});

module.exports = UserSchema;