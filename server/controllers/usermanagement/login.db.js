
const mongoose = require('mongoose');
const commonLib = require('./login.common');
var UserModel = require('./models/usermodel');
var async = require('async');

var obj = {}

obj.db = {}
obj.init = function (dbString) {
    mongoose.connect(dbString);
    // Get Mongoose to use the global promise library
    mongoose.Promise = global.Promise;
    //Get the default connection
    obj.db = mongoose.connection;
    //Bind connection to error event (to get notification of connection errors)
    obj.db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

obj.saveUserInfo = function (user, finalCb) {
    /*
            1: user1 creates with Joe Smith username. hash is generated based on that username.
            2: user1 updates his username with to something else John Smith.
            3: user2 creates with Joe Smith username. hash is generated based on that username. This is invalid.
            4: To safeguard against this...lets add some timetoken when generating the hash for userid.
    */
    var u = {};

    u.username = user.username;
    
    async.waterfall([
        function(next) {
            commonLib.generateUserId(user.username, function (data) {
                next(data);
            });
        },
        function(data, next) {
            u.userid = data;
            commonLib.hashit(u.userid, user.password, function (pwd) {
                u.passwordhash = pwd;
                u.firstname = user.firstname;
                u.lastname = user.lastname;
                u.email = user.email;
                var userObj = new UserModel(u);
                userObj.save(next);
            });
        }
    ], finalCb)
}

module.exports = obj;