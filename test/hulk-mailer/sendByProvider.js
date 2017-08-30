var chai = require("chai");
var config = require("../config");
var Email = require("../../lib/email");
var EspConnector = require("../../index");
var BadRequestError = require("../../lib/errors/badRequestError");
var ParameterInvalidError = require("../../lib/errors/parameterInvalidError");
var ParameterRequiredError = require("../../lib/errors/parameterRequiredError");

describe("EspConnector.sendByProvider()", function() {
  it("should provide valid name", function(done) {
    try {
      EspConnector.sendByProvider();
      done("the test case should fail");
    } catch(error) {
      chai.expect(error).to.be.instanceof(Error);
      chai.expect(error).to.be.instanceof(BadRequestError);
      chai.expect(error).to.be.instanceof(ParameterRequiredError);
      chai.expect(error).to.have.property("code", "PARAM_REQUIRED");
      chai.expect(error).to.have.property("status", 400);
      chai.expect(error.message).to.be.equal("name is required.");
      done();
    }
  });

  it("should provide valid configurations", function(done) {
    try {
      EspConnector.sendByProvider({});
      done("the test case should fail");
    } catch(error) {
      chai.expect(error).to.be.instanceof(Error);
      chai.expect(error).to.be.instanceof(BadRequestError);
      chai.expect(error).to.be.instanceof(ParameterInvalidError);
      chai.expect(error).to.have.property("code", "PARAM_INVALID");
      chai.expect(error).to.have.property("status", 400);
      chai.expect(error.message).to.be.equal("name should be a valid string.");
      done();
    }
  });

  it("should provide valid configurations", function(done) {
    try {
      EspConnector.sendByProvider("xyz");
      done("the test case should fail");
    } catch(error) {
      chai.expect(error).to.be.instanceof(Error);
      chai.expect(error).to.be.instanceof(BadRequestError);
      chai.expect(error).to.be.instanceof(ParameterInvalidError);
      chai.expect(error).to.have.property("code", "PARAM_INVALID");
      chai.expect(error).to.have.property("status", 400);
      chai.expect(error.message).to.be.equal("No provider for `xyz` is found.");
      done();
    }
  });

  it("should raise error on not providing email", function(done) {
    try {
      EspConnector.sendByProvider("captainamerica");
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

  it("should send Email [provider = ironman]", function(done) {
    var email = new Email({
      "from": "blockchainj7458@gmail.com",
      "to": "blockchainj7458@gmail.com",
      "subject": "Hello Sensei Blocchain",
      "text": "Congratulations Sensei Blocchain, you just sent an email!"
    });
    EspConnector.sendByProvider("ironman", email, function(error, success) {
      chai.expect(error).to.equal(null);
      chai.expect(success).to.equal(true);
      done();
    });
  });

  it("should send Email [provider = thor]", function(done) {
    var email = new Email({
      "from": "blockchainj7458@gmail.com",
      "to": ["blockchainj7458@gmail.com", "blockchainj7458+1@gmail.com"],
      "cc": ["blockchainj7458+2@gmail.com"],
      "subject": "Hello Sensei Blocchain",
      "text": "Congratulations Sensei Blocchain, you just sent an email!"
    });
    EspConnector.sendByProvider("thor", email, function(error, success) {
      chai.expect(error).to.equal(null);
      chai.expect(success).to.equal(true);
      done();
    });
  });

  it("should send Email [provider = hawkeye]", function(done) {
    var email = new Email({
      "from": "blockchainj7458@gmail.com",
      "to": ["blockchainj7458@gmail.com", "blockchainj7458+1@gmail.com"],
      "cc": ["blockchainj7458+2@gmail.com"],
      "subject": "Hello Sensei Blocchain",
      "text": "Congratulations Sensei Blocchain, you just sent an email!"
    });
    EspConnector.sendByProvider("hawkeye", email, function(error, success) {
      chai.expect(error).to.equal(null);
      chai.expect(success).to.equal(true);
      done();
    });
  });

  it("should send Email [provider = captainamerica]", function(done) {
    var email = new Email({
      "from": "blockchainj7458@gmail.com",
      "to": ["blockchainj7458@gmail.com", "blockchainj7458+1@gmail.com"],
      "cc": ["blockchainj7458+2@gmail.com"],
      "subject": "Hello Sensei Blocchain",
      "text": "Congratulations Sensei Blocchain, you just sent an email!"
    });
    EspConnector.sendByProvider("captainamerica", email, function(error, success) {
      chai.expect(error).to.equal(null);
      chai.expect(success).to.equal(true);
      done();
    });
  });
});
