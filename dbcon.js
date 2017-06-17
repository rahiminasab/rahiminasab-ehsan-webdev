/**
 * Created by ehsan on 6/17/17.
 */
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

var connectionString = 'mongodb://127.0.0.1:27017/webdev_summer2017'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds143191.mlab.com:43191/heroku_qnkpvr1t'; // user yours
}

mongoose.connect(connectionString);