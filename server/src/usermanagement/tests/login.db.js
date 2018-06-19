const chai = require("chai");
const expect = chai.expect;

var dblogin = require('../helpers/login.db');

//Set up default mongoose connection
var mongoDB = 'mongodb://accountUser:password@127.0.0.1:27017/conman';


describe('login db tests', () => {
    before(() => {
        return new Promise((resolve) => {
            dblogin.init(mongoDB, resolve);
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
            console.log('user saved in db.', u)
           
            dblogin.findUser({userid: u.userid}, (err,data)=> {
                console.log(err, data)
                done();
            })
            
        });
    });

    it('should take username and find the user in the backend data store', (done) => {
        dblogin.findUser({username: "someuser"}, function(err, user){
            if (err){
                console.log("error while trying to retrieve the document", err);
                return;
            }
            console.log('retrieved user from db.');
            console.log(user);
            expect(user).to.not.deep.equal([])
            done();
        });
    });
});