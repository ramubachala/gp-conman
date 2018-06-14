const chai = require("chai");
const expect = chai.expect;

var dblogin = require('../login.db');

describe('login db tests', () => {
    it('should take username and password and return a token', () => {
        var username = "";
        var password = "";
        var userid = dblogin.getuserid(username);
        var salt = hashit(password + userid);
        dblogin.login(username, password);
    });
});