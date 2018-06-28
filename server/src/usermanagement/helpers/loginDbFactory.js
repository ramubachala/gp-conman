var dblogin = require('../helpers/login.db');


var username = process.env.MONGODB_USERNAME.trim() || 'admin';
var password = process.env.MONGODB_PASSWORD.trim() || 'admin';
var server = process.env.MONGODB_SERVERNAME || '127.0.0.1';
var port = process.env.MONGODB_PORT || '27017';

//Set up default mongoose connection
var mongoDB = `mongodb://${username}:${password}@${server}:${port}/conman`;
console.log(mongoDB);
module.exports = new Promise((resolve, reject) => {
    dblogin.init(mongoDB, (err) => {
            if (err){
                console.log('error initing the db', err);
                reject();
            }
            console.log('db setup successful');
            resolve(dblogin);
    });
});