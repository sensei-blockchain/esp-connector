var _ = require("lodash");
var EmailProviderManager = require("./lib/manager");
var NotInitializedError = require("./lib/errors/notInitializedError");
var ParameterInvalidError = require("./lib/errors/parameterInvalidError");

var manager;

function EspConnector() {}

var isInitialized = function() {
  if(!manager)
    throw new NotInitializedError("EspConnector not initialized. Use EspConnector.init(config)");
}

var addNewProvider = function(settings) {
  isInitialized();
  manager.registerProvider(settings);
};

var removeProvider = function(name) {
  isInitialized();
  manager.removeProvider(name);
};

EspConnector.addNewProvider = addNewProvider;

EspConnector.removeProvider = removeProvider;

EspConnector.init = function(config) {
  if(!_.isArray(config) || !_.every(config, _.isObject)) {
    throw new ParameterInvalidError("Invalid configuration object passed.");
  }
  manager = new EmailProviderManager();
  _.forEach(config, addNewProvider);
}

EspConnector.send = function(email, sent) {
  isInitialized();
  manager.send(email, sent);
}

EspConnector.sendByProvider = function(name, email, sent) {
  isInitialized();
  manager.sendByProvider(name, email, sent);
}

EspConnector.Email = require("./lib/email");

module.exports = EspConnector;
