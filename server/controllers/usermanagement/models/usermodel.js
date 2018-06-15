//Require Mongoose
var mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;

var UserModelSchema = new Schema({
    /*
          username
          userid
          passwordhash
          firstname
          lastname
          email
          user_since
          updated_date
          last_login
          token
          islocked
          locked_until
          followers
          following (quicker)
      */
    username: String,
    userid: String,
    passwordhash: String,
    firstname: String,
    lastname: String,
    email: String,
    user_since: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    last_login: { type: Date },
    token: String,
    islocked: Boolean,
    locked_until: { type: Date },
    followers: [],
    following: []
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model("UserModel", UserModelSchema);
