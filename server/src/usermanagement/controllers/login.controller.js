//var registration = require('../lib/registration')
//var signin = require('../')

var obj = {};

obj.register = function(req, res) {
  var body = req.body;
  var user = {};

  var username = body.username;
  var password = body.password;
  var email = body.email;
  var firstname = body.firstname;
  var lastname = body.lastname;

  // instrumentation

  // eventing

  var dbHelper = require("../helpers/dbHelper");

  dbHelper.then(
    function onsuccess(dblogin) {
      dblogin.saveUserInfo(user, function(err, u) {
        if (err) {
          console.log("error saving in db", err);
          return;
        }
        console.log("user saved in db.");
      });
    },
    function onFailure() {
      // set the status code for the response correctly on a failure and return to client.
      res.status();
    }
  );
};

module.exports = obj;
