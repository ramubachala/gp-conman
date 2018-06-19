const chai = require("chai");
const expect = chai.expect;

var dblogin = require('../login.db');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/conman';


describe('login db tests', () => {
    before(() => {
        dblogin.init(mongoDB);
    });
    // it('should take username and password and return a token', () => {
    //     var username = "";
    //     var password = "";
    //     var userid = dblogin.getuserid(username);
    //     var salt = hashit(password, userid);
    //     dblogin.login(username, password);
    // });

    it('should take user info and save it in backend data store', (done) => {
        var user = {}

        user.username = "someuser";
        user.password = "somepassword";
        user.email = "rb@yahoo.com";
        user.firstname = "firstnam1"
        user.lastname = "lastname";
        
        dblogin.saveUserInfo(user, function(status) {
            console.log('user saved in db.')
            console.log(status);
            done();
        });
    });
});