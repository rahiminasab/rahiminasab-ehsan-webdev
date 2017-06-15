/**
 * Created by ehsan on 6/5/17.
 */

var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    roles: [{type: String,
        defualt: 'USER',
        enum:['USER', 'FACULTY', 'STUDENT', 'ADMIN']}],
    email: String,
    phone: String,
    creationDate: {type: Date, default: Date.now()},
    websites: [
        {type: mongoose.Schema.ObjectId, ref: 'WebsiteModel'}
    ],
    google: {
        id:    String,
        token: String
    }

}, {collection: 'assignment_user'});

module.exports = UserSchema;