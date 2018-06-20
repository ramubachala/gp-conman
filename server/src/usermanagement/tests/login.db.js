const chai = require("chai");
const expect = chai.expect;

var dblogin = require('../helpers/login.db');

var username = process.env.MONGODB_USERNAME || 'admin';
var password = process.env.MONGODB_PASSWORD || 'admin';
var server = process.env.MONGODB_SERVERNAME || '127.0.0.1';
var port = process.env.MONGODB_PORT || '27017';

//Set up default mongoose connection
var mongoDB = `mongodb://${username}:${password}@${server}:${port}/conman`;


describe('login db tests', () => {
    before(() => {
        return new Promise((resolve) => {
            dblogin.init(mongoDB, () => {
                dblogin.clearLoginDbCollection(function (err, result) {
                    if (err){
                        console.log('error clearing db collection');
                        return;
                    }
                    console.log('cleared login collection', result);
                    resolve();
                });
            });
        });
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
        
        dblogin.saveUserInfo(user, function(err, u) {
            if (err) {
                console.log("error saving in db", err);
                return;
            }
            console.log('user saved in db.')
           
            dblogin.findUser({userid: u.userid}, (err,data)=> {
                if (err) {
                    console.log('find user failed', err);
                    return;
                }
                //console.log(err, data);
                expect(data[0].firstname).to.equal('firstnam1');
                done();
            })
            
        });
    });

    it('should take user info duplications and save it in backend data store. Should log an err and return because of duplicates.', (done) => {
        var user = {}

        user.username = "someuserdup1";
        user.password = "somepassword";
        user.email = "rb@yahoo.com";
        user.firstname = "firstnamedup1"
        user.lastname = "lastnamedup1";
        
        dblogin.saveUserInfo(user, function(err, u) {
            if (err) {
                console.log("error saving in db", err);
                done();
                return;
            }
            console.log('user saved in db.')
           
            dblogin.saveUserInfo(user, function(err, u) {
                if (err) {
                    expect(true).to.be.true;
                    done();
                    return;
                }
    
                expect(true).to.be.false;
                done();
            });
            
        });
    });

    it('should take username and find the user in the backend data store', (done) => {
        dblogin.findUser({username: "someuser"}, function(err, users){
            if (err){
                console.log("error while trying to retrieve the document", err);
                return;
            }
            //console.log('retrieved user from db.');
            //console.log(user);
            expect(users.length).to.equal(1);
            done();
        });
    });
});