var express = require("express");
var app = express();
var port = process.env.WEBSERVERPORT || 3010;

var bodyParser = require("body-parser");
var loginController = require("./src/usermanagement/controllers/login.controller");

app.use(bodyParser.json());

app.post("/api/register", loginController.register);
app.listen(port);
console.log("Express app listening on port.." + port);