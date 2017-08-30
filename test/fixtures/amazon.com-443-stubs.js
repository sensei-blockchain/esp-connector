var sinon = require("sinon");
var Email = require("../../lib/email");
var ConfigurationInvalidError = require("../../lib/errors/configurationInvalidError");
var SES = require("../../lib/providers/ses");

var awsSESStub = sinon.stub(SES.prototype, "send");

awsSESStub.withArgs(new Email({
  "from": "blockchainj7458@gmail.com",
  "to": ["blockchainj7458@gmail.com", "blockchainj7458+1@gmail.com"],
  "cc": ["blockchainj7458+2@gmail.com"],
  "subject": "Hello Sensei Blocchain",
  "text": "Congratulations Sensei Blocchain, you just sent an email!"
})).callsArgWith(1, null, true);

awsSESStub.withArgs(new Email({
  "from": "blockchainj7458@gmail.com",
  "to": "blockchainj7458+1@gmail.com",
  "subject": "Hello Sensei Blocchain",
  "text": "Congratulations Sensei Blocchain, you just sent an email!"
})).callsArgWith(1, new ConfigurationInvalidError("captainamerica"), false);

awsSESStub.withArgs(new Email({
  "from": "blockchainj7458@gmail.com",
  "to": "blockchainj7458+2@gmail.com",
  "subject": "Hello Sensei Blocchain",
  "text": "Congratulations Sensei Blocchain, you just sent an email!"
})).callsArgWith(1, new ConfigurationInvalidError("captainamerica"), false);
