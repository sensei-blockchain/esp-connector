var _ = require("lodash");
var chai = require("chai");
var config = require("../config");
var Email = require("../../lib/email");
var EspConnector = require("../../index");
var BadRequestError = require("../../lib/errors/badRequestError");
var InternalServerError = require("../../lib/errors/internalServerError");
var NoProviderFoundError = require("../../lib/errors/noProviderFoundError");
var ParameterInvalidError = require("../../lib/errors/parameterInvalidError");

describe("EspConnector.send()", function() {
  it("should raise error on not providing email", function(done) {
    try {
      EspConnector.send();
      done("the test case should fail");
    } catch(error) {
      chai.expect(error).to.be.instanceof(Error);
      chai.expect(error).to.be.instanceof(BadRequestError);
      chai.expect(error).to.be.instanceof(ParameterInvalidError);
      chai.expect(error).to.have.property("code", "PARAM_INVALID");
      chai.expect(error).to.have.property("status", 400);
      chai.expect(error.message).to.be.equal("`email` should be of an object of prototype EspConnector.Email");
      done();
    }
  });

  it("should raise error on no provider found", function(done) {
    try {
      _.forEach(config.email_providers, function(provider) {
        EspConnector.removeProvider(provider.name);
      });
      var email = new Email({
        "from": "blockchainj7458@gmail.com",
        "to": "blockchainj7458@gmail.com",
        "subject": "Hello Sensei Blocchain",
        "text": "Congratulations Sensei Blocchain, you just sent an email!"
      });
      EspConnector.send(email);
      done("the test case should fail");
    } catch(error) {
      chai.expect(error).to.be.instanceof(Error);
      chai.expect(error).to.be.instanceof(InternalServerError);
      chai.expect(error).to.be.instanceof(NoProviderFoundError);
      chai.expect(error).to.have.property("code", "NO_PROVIDER");
      chai.expect(error).to.have.property("status", 500);
      chai.expect(error.message).to.be.equal("No Provider Found.");
      _.forEach(config.email_providers, function(provider) {
        EspConnector.addNewProvider(provider);
      });
      done();
    }
  });

  it("should send Email", function(done) {
    var email = new Email({
      "from": "blockchainj7458@gmail.com",
      "to": "blockchainj7458@gmail.com",
      "subject": "Hello Sensei Blocchain",
      "text": "Congratulations Sensei Blocchain, you just sent an email!"
    });
    EspConnector.send(email, function(error, success) {
      chai.expect(error).to.equal(null);
      chai.expect(success).to.equal(true);
      done();
    });
  });
});
