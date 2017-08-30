var chai = require("chai");
var config = require("../config");
var EspConnector = require("../../index");
var BadRequestError = require("../../lib/errors/badRequestError");
var ParameterInvalidError = require("../../lib/errors/parameterInvalidError");
var ParameterRequiredError = require("../../lib/errors/parameterRequiredError");

describe("EspConnector.addNewProvider()", function() {
  it("should provide configurations", function(done) {
    try {
      EspConnector.addNewProvider();
      done("the test case should fail");
    } catch(error) {
      chai.expect(error).to.be.instanceof(Error);
      chai.expect(error).to.be.instanceof(BadRequestError);
      chai.expect(error).to.be.instanceof(ParameterInvalidError);
      chai.expect(error).to.have.property("code", "PARAM_INVALID");
      chai.expect(error).to.have.property("status", 400);
      chai.expect(error.message).to.be.equal("Invalid configuration object passed.");
      done();
    }
  });

  it("should provide name for a config", function(done) {
    try {
      EspConnector.addNewProvider({});
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

  it("should provide a provider name", function(done) {
    try {
      EspConnector.addNewProvider({ name: "xyz" });
      done("the test case should fail");
    } catch(error) {
      chai.expect(error).to.be.instanceof(Error);
      chai.expect(error).to.be.instanceof(BadRequestError);
      chai.expect(error).to.be.instanceof(ParameterRequiredError);
      chai.expect(error).to.have.property("code", "PARAM_REQUIRED");
      chai.expect(error).to.have.property("status", 400);
      chai.expect(error.message).to.be.equal("provider is required.");
      done();
    }
  });

  it("should provide a valid provider name", function(done) {
    try {
      EspConnector.addNewProvider({ name: "xyz", provider: "xyz" });
      done("the test case should fail");
    } catch(error) {
      chai.expect(error).to.be.instanceof(Error);
      chai.expect(error).to.be.instanceof(BadRequestError);
      chai.expect(error).to.be.instanceof(ParameterInvalidError);
      chai.expect(error).to.have.property("code", "PARAM_INVALID");
      chai.expect(error).to.have.property("status", 400);
      chai.expect(error.message).to.be.equal("Unknown provider passed.");
      done();
    }
  });

  it("should not use same name for different settings", function(done) {
    try {
      EspConnector.addNewProvider({
        name: "captainamerica", provider: "mandrill"
      });
      done("the test case should fail");
    } catch(error) {
      chai.expect(error).to.be.instanceof(Error);
      chai.expect(error).to.be.instanceof(BadRequestError);
      chai.expect(error).to.be.instanceof(ParameterInvalidError);
      chai.expect(error).to.have.property("code", "PARAM_INVALID");
      chai.expect(error).to.have.property("status", 400);
      chai.expect(error.message).to.be.equal("name `captainamerica` is already taken for a provider.");
      done();
    }
  });

  it("should add new provider", function(done) {
    EspConnector.addNewProvider(config.new_provider);
    done();
  });
});
