var chai = require("chai");
var config = require("../config");
var Email = require("../../lib/email");
var BaseProvider = require("../../lib/providers/baseProvider");
var SES = require("../../lib/providers/ses");
var ForbiddenError = require("../../lib/errors/forbiddenError");
var BadRequestError = require("../../lib/errors/badRequestError");
var ParameterInvalidError = require("../../lib/errors/parameterInvalidError");
var ParameterRequiredError = require("../../lib/errors/parameterRequiredError");
var ConfigurationInvalidError = require("../../lib/errors/configurationInvalidError");

var provider;

describe("SES", function() {
  describe("new SES()", function() {
    it("should raise error if config is not passed", function(done) {
      try {
        provider = new SES();
        done("the test case should fail");
      } catch(error) {
        chai.expect(error).to.be.instanceof(Error);
        chai.expect(error).to.be.instanceof(BadRequestError);
        chai.expect(error).to.be.instanceof(ParameterRequiredError);
        chai.expect(error).to.have.property("code", "PARAM_REQUIRED");
        chai.expect(error).to.have.property("status", 400);
        chai.expect(error.message).to.be.equal("Settings for ses is required.");
        done();
      }
    });

    it("should raise error if accessKeyId is not passed", function(done) {
      try {
        provider = new SES({});
        done("the test case should fail");
      } catch(error) {
        chai.expect(error).to.be.instanceof(Error);
        chai.expect(error).to.be.instanceof(BadRequestError);
        chai.expect(error).to.be.instanceof(ParameterRequiredError);
        chai.expect(error).to.have.property("code", "PARAM_REQUIRED");
        chai.expect(error).to.have.property("status", 400);
        chai.expect(error.message).to.be.equal("accessKeyId is required.");
        done();
      }
    });

    it("should raise error if accessKeyId is not string", function(done) {
      try {
        provider = new SES({ accessKeyId: {} });
        done("the test case should fail");
      } catch(error) {
        chai.expect(error).to.be.instanceof(Error);
        chai.expect(error).to.be.instanceof(BadRequestError);
        chai.expect(error).to.be.instanceof(ParameterInvalidError);
        chai.expect(error).to.have.property("code", "PARAM_INVALID");
        chai.expect(error).to.have.property("status", 400);
        chai.expect(error.message).to.be.equal("accessKeyId should be a string.");
        done();
      }
    });

    it("should raise error if secretAccessKey is not passed", function(done) {
      try {
        provider = new SES({ accessKeyId: "xyz" });
        done("the test case should fail");
      } catch(error) {
        chai.expect(error).to.be.instanceof(Error);
        chai.expect(error).to.be.instanceof(BadRequestError);
        chai.expect(error).to.be.instanceof(ParameterRequiredError);
        chai.expect(error).to.have.property("code", "PARAM_REQUIRED");
        chai.expect(error).to.have.property("status", 400);
        chai.expect(error.message).to.be.equal("secretAccessKey is required.");
        done();
      }
    });

    it("should raise error if secretAccessKey is not string", function(done) {
      try {
        provider = new SES({ accessKeyId: "xyz", secretAccessKey: {} });
        done("the test case should fail");
      } catch(error) {
        chai.expect(error).to.be.instanceof(Error);
        chai.expect(error).to.be.instanceof(BadRequestError);
        chai.expect(error).to.be.instanceof(ParameterInvalidError);
        chai.expect(error).to.have.property("code", "PARAM_INVALID");
        chai.expect(error).to.have.property("status", 400);
        chai.expect(error.message).to.be.equal("secretAccessKey should be a string.");
        done();
      }
    });

    it("should raise error if region is not passed", function(done) {
      try {
        provider = new SES({ accessKeyId: "xyz", secretAccessKey: "xyz" });
        done("the test case should fail");
      } catch(error) {
        chai.expect(error).to.be.instanceof(Error);
        chai.expect(error).to.be.instanceof(BadRequestError);
        chai.expect(error).to.be.instanceof(ParameterRequiredError);
        chai.expect(error).to.have.property("code", "PARAM_REQUIRED");
        chai.expect(error).to.have.property("status", 400);
        chai.expect(error.message).to.be.equal("region is required.");
        done();
      }
    });

    it("should raise error if region is not string", function(done) {
      try {
        provider = new SES({ accessKeyId: "xyz", secretAccessKey: "xyz", region: {} });
        done("the test case should fail");
      } catch(error) {
        chai.expect(error).to.be.instanceof(Error);
        chai.expect(error).to.be.instanceof(BadRequestError);
        chai.expect(error).to.be.instanceof(ParameterInvalidError);
        chai.expect(error).to.have.property("code", "PARAM_INVALID");
        chai.expect(error).to.have.property("status", 400);
        chai.expect(error.message).to.be.equal("region should be a string.");
        done();
      }
    });

    it("should create provider object", function(done) {
      provider = new SES(config.email_providers[3]);
      chai.expect(provider).to.be.instanceof(SES);
      chai.expect(provider).to.be.instanceof(BaseProvider);
      chai.expect(provider).to.respondTo("_prepareRequest");
      chai.expect(provider).to.have.property("ses");
      done();
    });
  });

  describe("_prepareRequest()", function() {
    it("should raise error on not providing email", function(done) {
      try {
        provider._prepareRequest();
        done("the test case should fail");
      } catch(error) {
        chai.expect(error).to.be.instanceof(Error);
        chai.expect(error).to.be.instanceof(BadRequestError);
        chai.expect(error).to.be.instanceof(ParameterInvalidError);
        chai.expect(error).to.have.property("status", 400);
        chai.expect(error).to.have.property("code", "PARAM_INVALID");
        chai.expect(error.message).to.be.equal("`email` should be of an object of prototype EspConnector.Email");
        done();
      }
    });

    it("should return options JS object for request.js", function(done) {
      var email = new Email({
        "from": "blockchainj7458@gmail.com",
        "to": ["blockchainj7458@gmail.com", "blockchainj7458+1@gmail.com"],
        "cc": ["blockchainj7458+2@gmail.com"],
        "subject": "Hello Sensei Blocchain",
        "text": "Congratulations Sensei Blocchain, you just sent an email!"
      });
      var request = provider._prepareRequest(email);
      chai.expect(request).to.be.a("object");
      chai.expect(request).to.include.keys("Destination", "Message", "Source");
      chai.expect(request).to.not.include.keys("ReplyToAddresses", "Tags");
      chai.expect(request.Destination).to.be.a("object");
      chai.expect(request.Destination).to.include.keys("CcAddresses", "ToAddresses");
      chai.expect(request.Destination.CcAddresses).to.be.a("Array");
      chai.expect(request.Destination.CcAddresses).to.have.length(1);
      chai.expect(request.Destination.CcAddresses[0]).to.equal("blockchainj7458+2@gmail.com");
      chai.expect(request.Destination.ToAddresses).to.be.a("Array");
      chai.expect(request.Destination.ToAddresses).to.have.length(2);
      chai.expect(request.Destination.ToAddresses[0]).to.equal("blockchainj7458@gmail.com");
      chai.expect(request.Destination.ToAddresses[1]).to.equal("blockchainj7458+1@gmail.com");
      chai.expect(request.Message).to.be.a("object");
      chai.expect(request.Message).to.include.keys("Body", "Subject");
      chai.expect(request.Message.Body).to.be.a("object");
      chai.expect(request.Message.Body).to.include.keys("Text");
      chai.expect(request.Message.Body).to.not.include.keys("Html");
      chai.expect(request.Message.Body.Text).to.be.a("object");
      chai.expect(request.Message.Body.Text).to.include.keys("Data");
      chai.expect(request.Message.Body.Text.Data).to.equal("Congratulations Sensei Blocchain, you just sent an email!");
      chai.expect(request.Message.Subject).to.be.a("object");
      chai.expect(request.Message.Subject).to.include.keys("Data");
      chai.expect(request.Message.Subject.Data).to.equal("Hello Sensei Blocchain");
      chai.expect(request.Source).to.equal("blockchainj7458@gmail.com");
      done();
    });
  });

  describe("send()", function() {
    it("should forbid if incorrect configurations passed", function(done) {
      var invalidProvider = new SES({
        name: "captainamerica",
        accessKeyId: "xyz",
        secretAccessKey: "xyz",
        region: "xyz"
      });
      var email = new Email({
        "from": "blockchainj7458@gmail.com",
        "to": "blockchainj7458+1@gmail.com",
        "subject": "Hello Sensei Blocchain",
        "text": "Congratulations Sensei Blocchain, you just sent an email!"
      });
      invalidProvider.send(email, function(error, success) {
        chai.expect(error).to.be.instanceof(Error);
        chai.expect(error).to.be.instanceof(ForbiddenError);
        chai.expect(error).to.be.instanceof(ConfigurationInvalidError);
        chai.expect(error).to.have.property("code", "CONFIG_INVALID");
        chai.expect(error).to.have.property("status", 401);
        chai.expect(error.message).to.be.equal("Configurations for [captainamerica] is forbidden.");
        chai.expect(success).to.equal(false);
        done();
      });
    });

    it("should forbid if incorrect configurations passed", function(done) {
      var invalidProvider = new SES({
        name: "captainamerica",
        accessKeyId: "xyz",
        secretAccessKey: "xyz",
        region: "us-east-1"
      });
      var email = new Email({
        "from": "blockchainj7458@gmail.com",
        "to": "blockchainj7458+2@gmail.com",
        "subject": "Hello Sensei Blocchain",
        "text": "Congratulations Sensei Blocchain, you just sent an email!"
      });
      invalidProvider.send(email, function(error, success) {
        chai.expect(error).to.be.instanceof(Error);
        chai.expect(error).to.be.instanceof(ForbiddenError);
        chai.expect(error).to.be.instanceof(ConfigurationInvalidError);
        chai.expect(error).to.have.property("code", "CONFIG_INVALID");
        chai.expect(error).to.have.property("status", 401);
        chai.expect(error.message).to.be.equal("Configurations for [captainamerica] is forbidden.");
        chai.expect(success).to.equal(false);
        done();
      });
    });

    it("should send Email", function(done) {
      var email = new Email({
        "from": "blockchainj7458@gmail.com",
        "to": ["blockchainj7458@gmail.com", "blockchainj7458+1@gmail.com"],
        "cc": ["blockchainj7458+2@gmail.com"],
        "subject": "Hello Sensei Blocchain",
        "text": "Congratulations Sensei Blocchain, you just sent an email!"
      });
      provider.send(email, function(error, success) {
        chai.expect(error).to.equal(null);
        chai.expect(success).to.equal(true);
        done();
      });
    });
  });
});
