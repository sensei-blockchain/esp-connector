# esp-connector

.## Installation
```shell
$ npm i --save esp-connector
```

## Why ESPs Connector?

ESPs Connector Mailer minimizes the email delivery failures by allowing one to configure multiple Email Service Providers(ESPs). It manages all the email delivery by switching between ESPs depending on their availability and behaviour.

## Which ESPs are supported?
Currently four providers are supported: Mailgun, Mandrill, Sendgrid, SES.

### Configuration

Configure Email Service Providers.
```js
const config = [
  {
    name: "ironman",
    provider: "mailgun",
    apiKey: "key-imagined",
    domain: "sandboxed.domain.mailgun.org"
  },
  {
    name: "thor",
    provider: "mandrill",
    apiKey: "sandboxedkey"
  },
  {
    name: "hawkeye",
    provider: "sendgrid",
    username: "sandboxed",
    password: "sandboxedkey"
  },
  {
    name: "captainamerica",
    provider: "ses",
    accessKeyId: "sandboxedkey",
    secretAccessKey: "sandboxedAccesskey",
    region: "us-east-1"
  }
]
```

You can configure multiple accounts of same provider.
```js
const config = [
  {
    name: "ironman",
    provider: "mandrill",
    apiKey: "sandboxedkey",
  },
  {
    name: "hawkeye",
    provider: "mandrill",
    apiKey: "sandboxedkey2"
  }
]
```

Initialize your config.
```js
// ES5
var EspConnector = require("esp-connector");
EspConnector.init(config);

// ES6
import EspConnector from "esp-connector";
EspConnector.init(config);
```

Add a new Provider on the fly.
```js
EspConnector.addNewProvider({
  name: "loki",
  provider: "mandrill",
  apiKey: "sandboxedkey",
});
```

Remove a Provider if not required anymore.
```js
EspConnector.removeProvider("loki");
```

### Create and send your Email
```js
const email = new EspConnector.Email({
  "from": "XXXXXX@gmail.com",
  "to": "XXXXXXX@gmail.com",
  "subject": "Hello",
  "text": "Congratulations, you just sent an email!"
});
EspConnector.send(email);
// or
EspConnector.sendByProvider("thor", email);
```
