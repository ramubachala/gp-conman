const crypto = require('crypto');

module.exports = {
    hashit: function (userid, password, cb) {
        const hash = crypto.createHash('sha256');
        // apply the salt
        var salted = userid + password;
        // apply some hashing function to the salted password.
        // apply hash algorithm here

        hash.on('readable', () => {
            const data = hash.read();
            if (data) {
              cb(data.toString('hex'));
            }
          });
        
        hash.write(salted);
        hash.end();
    },
    generateUserId: function (username, cb) {
        const hash = crypto.createHash('sha256');
        // apply some hashing function to the username.
        // apply hash algorithm here

        hash.on('readable', () => {
            const data = hash.read();
            if (data) {
              cb(data.toString('hex').substring(0,12));
            }
          });
        
        hash.write(username + (new Date()).toTimeString());
        hash.end();
    }
}