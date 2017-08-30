var chai = require("chai");
var config = require("../config");
var EspConnector = require("../../index");
var BadRequestError = require("../../lib/errors/badRequestError");
var InternalServerError = require("../../lib/errors/internalServerError");
var NotInitializedError = require("../../lib/errors/notInitializedError");
var ReInitializationError = require("../../lib/errors/reinitializationError");
var ParameterInvalidError = require("../../lib/errors/parameterInvalidError");

describe("EspConnector.init()", function() {
  it("should provide valid configurations", function(done) {
    try {
      EspConnector.init();
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

  it("should provide valid configurations", function(done) {
    try {
      EspConnector.init({});
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

  it("should provide valid configurations", function(done) {
    try {
      EspConnector.init(["xyz"]);
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

  it("should provide valid configurations", function(done) {
    try {
      EspConnector.init([9]);
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

  it("should initialize EspConnector before use", function(done) {
    try {
      EspConnector.addNewProvider();
      done("the test case should fail");
    } catch(error) {
      chai.expect(error).to.be.instanceof(Error);
      chai.expect(error).to.be.instanceof(InternalServerError);
      chai.expect(error).to.be.instanceof(NotInitializedError);
      chai.expect(error).to.have.property("code", "NOT_INITIALIZED");
      chai.expect(error).to.have.property("status", 500);
      chai.expect(error.message).to.be.equal("EspConnector not initialized. Use EspConnector.init(config)");
      done();
    }
  });

  it("should initialize EspConnector before use", function(done) {
    try {
      EspConnector.removeProvider();
      done("the test case should fail");
    } catch(error) {
      chai.expect(error).to.be.instanceof(Error);
      chai.expect(error).to.be.instanceof(InternalServerError);
      chai.expect(error).to.be.instanceof(NotInitializedError);
      chai.expect(error).to.have.property("code", "NOT_INITIALIZED");
      chai.expect(error).to.have.property("status", 500);
      chai.expect(error.message).to.be.equal("EspConnector not initialized. Use EspConnector.init(config)");
      done();
    }
  });

  it("should initialize EspConnector before use", function(done) {
    try {
      EspConnector.send();
      done("the test case should fail");
    } catch(error) {
      chai.expect(error).to.be.instanceof(Error);
      chai.expect(error).to.be.instanceof(InternalServerError);
      chai.expect(error).to.be.instanceof(NotInitializedError);
      chai.expect(error).to.have.property("code", "NOT_INITIALIZED");
      chai.expect(error).to.have.property("status", 500);
      chai.expect(error.message).to.be.equal("EspConnector not initialized. Use EspConnector.init(config)");
      done();
    }
  });

  it("should initialize EspConnector", function(done) {
    EspConnector.init(config.email_providers);
    done();
  });

  it("should not re-initialize EspConnector", function(done) {
    try {
      EspConnector.init(config.email_providers);
      done("the test case should fail");
    } catch(error) {
      chai.expect(error).to.be.instanceof(Error);
      chai.expect(error).to.be.instanceof(InternalServerError);
      chai.expect(error).to.be.instanceof(ReInitializationError);
      chai.expect(error).to.have.property("code", "RE_INITIALIZED");
      chai.expect(error).to.have.property("status", 500);
      chai.expect(error.message).to.be.equal("Mailer Already initialized.");
      done();
    }
  });
});
