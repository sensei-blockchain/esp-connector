var _ = require("lodash");
var request = require("request");
var Email = require("../email");
var BaseProvider = require("./baseProvider");
var BadRequestError = require("../errors/badRequestError");
var ParameterInvalidError = require("../errors/parameterInvalidError");
var ConfigurationInvalidError = require("../errors/configurationInvalidError");

function Mandrill(config) {
  BaseProvider.call(this, "mandrill", config, ["apiKey"]);

  this.apiKey = config.apiKey;
}

Mandrill.prototype = Object.create(BaseProvider.prototype);
Mandrill.prototype.constructor = Mandrill;

Mandrill.prototype._prepareToField = function(mails, type) {
  return _.map(mails, function(mail) {
    return {
      email: mail,
      type: type
    }
  });
}

Mandrill.prototype._prepareFormData = function(email) {
  if(!(email instanceof Email))
    throw new ParameterInvalidError("`email` should be of an object of prototype EspConnector.Email");
  return {
    key: this.apiKey,
    message: _.omitBy({
      from_email: email.getFrom(),
      to: _.flatten([
        this._prepareToField(email.getTo(), "to"),
        this._prepareToField(email.getCc(), "cc"),
        this._prepareToField(email.getBcc(), "bcc")
      ]),
      subject: email.getSubject(),
      html: email.getHtml(),
      text: email.getText()
    }, _.isEmpty)
  };
}

Mandrill.prototype._prepareRequest = function(email) {
  return {
    method: "POST",
    url: "https://mandrillapp.com/api/1.0/messages/send.json",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    form: this._prepareFormData(email),
    json: true
  };
}

Mandrill.prototype.send = function(email, done) {
  request(this._prepareRequest(email), function (err, response, body) {
    var error = null, success = false;
    if(err)
      error = err.message;
    if(body && body.status === "error") {
      error = new BadRequestError(body.message || "Incorrect Request.");
      if(body.name === "Invalid_Key")
        error = new ConfigurationInvalidError(this.name);
    }
    else {
      _.forEach(body, function(message) {
        if(message.status !== "sent")
          error = new BadRequestError(message.reject_reason);
      });
    }
    if(!error)
      success = true;
    done(error, success);
  }.bind(this));
}

module.exports = Mandrill;
