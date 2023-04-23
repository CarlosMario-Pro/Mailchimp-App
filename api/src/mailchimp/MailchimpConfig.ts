const mailchimp = require('@mailchimp/mailchimp_marketing');

mailchimp.setConfig({
  server: 'us21',
  apiKey: 'f108ff711f12c74c7add432e99f4ec69-us21',
});

export default mailchimp;
