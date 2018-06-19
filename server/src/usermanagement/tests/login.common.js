const chai = require("chai");
const expect = chai.expect;

var common = require("../helpers/login.common");

describe("login common helper tests", () => {
  it("should take user and password and hash it", (done) => {
    var userid = "someuser";
    var password = "somepassword";
    var hash = "";
    common.hashit(userid, password, (data) => {
        console.log(data)
        setTimeout(() => {
            hash = data;
            expect(hash).to.equal("419e3ce7ad044b97a81b6e67e90d22d63aae4ac7643cd6212e7fb3723bef2794");
            done();
        }, 100)
    });
  });
});
