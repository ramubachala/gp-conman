//var registration = require('../lib/registration')
//var signin = require('../')

var obj = {};

obj.register = function(req, res) {
  var body = req.body;
  var user = {};

  user.username = body.username;
  user.password = body.password;
  user.email = body.email;
  user.firstname = body.firstname;
  user.lastname = body.lastname;

  // instrumentation
  console.log("got call for register", user);
  // eventing

  var dbFactory = require("../helpers/loginDbFactory");

  dbFactory.then(
    function onsuccess(dblogin) {
      dblogin.saveUserInfo(user, function(err, u) {
        if (err) {
          console.log("error saving in db", err);
          res
            .status(500)
            .send("error saving user in db. username already exists");
          return;
        }
        console.log("user saved in db.");
        res.status(200).send("OK");
      });
    },
    function onFailure() {
      // set the status code for the response correctly on a failure and return to client.
      console.log("error creating db login obj.");
      res.status(500);
    }
  );
};

module.exports = obj;
