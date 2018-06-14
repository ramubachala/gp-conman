const crypto = require('crypto');
const hash = crypto.createHash('sha256');


module.exports = {
    hashit: function (userid, password, cb) {
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
    }
}