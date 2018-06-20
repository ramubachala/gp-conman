
const mongoose = require('mongoose');
const commonLib = require('../helpers/login.common');

var async = require('async');
var obj = {}

obj.db = {}
obj.UserModel = {}
obj.init = function (dbString, cb) {
    mongoose.connect(dbString);
    // Get Mongoose to use the global promise library
    mongoose.Promise = global.Promise;
    //Get the default connection
    obj.db = mongoose.connection;
    //Bind connection to error event (to get notification of connection errors)
    obj.db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    obj.db.on('open', ()=> {
        obj.UserModel = require('../models/usermodel');
        cb();
    });
}


obj.findUser = function (input, cb) {
    // execute the query at a later time
    var query = obj.UserModel.find(input).exec();
    query.then(function(docs) {
        //console.log('d', docs);
        cb(null, docs);
    }, function(err) {
        cb(err);
    });
}

obj.clearLoginDbCollection = function(cb) {
    obj.db.db.dropCollection('UserModel', cb);
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
        function (next) {
            commonLib.generateUserId(user.username, function (data) {
                next(null, data);
            });
        },
        function (data, next) {
            u.userid = data;
            commonLib.hashit(u.userid, user.password, function (pwd) {
                u.passwordhash = pwd;
                u.firstname = user.firstname;
                u.lastname = user.lastname;
                u.email = user.email;
                var userObj = new obj.UserModel(u);
                userObj.save((err)=> {
                    if (err) {
                        console.log('error while saving data', err);
                        next(err);
                    } else {
                        next(null, u);
                    }
                    
                });
            });
        }
    ], finalCb)
}

module.exports = obj;