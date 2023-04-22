const mailchimp = require('@mailchimp/mailchimp_marketing');

mailchimp.setConfig({
  server: 'us9',
  apiKey: 'e979b4220979306d1818580a18f43337-us9',
});

export default mailchimp;
