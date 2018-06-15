const chai = require("chai");
const expect = chai.expect;

var dblogin = require('../login.db');
var UserModel = require('../models/usermodel');
//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/conman';
var db;

describe('login db tests', () => {
    before(() => {
        mongoose.connect(mongoDB);
        // Get Mongoose to use the global promise library
        mongoose.Promise = global.Promise;
        //Get the default connection
        db = mongoose.connection;
        //Bind connection to error event (to get notification of connection errors)
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        console.log('database created...', db)
    });
    // it('should take username and password and return a token', () => {
    //     var username = "";
    //     var password = "";
    //     var userid = dblogin.getuserid(username);
    //     var salt = hashit(password, userid);
    //     dblogin.login(username, password);
    // });

    it('should take user info and save it in backend data stor', (done) => {

        usermodel = new UserModel({
            username: "ramu",
            passwordhash: "somehash"
        })

        usermodel.save(function (err) {
            if (err) console.log('error while saving ' + err);

            console.log("success")
            done();
        });
    });
});