try {
  require('dotenv').config();
} catch (error) {
  // Do nothing
}
const AWS = require('aws-sdk')

// Configuring AWS
AWS.config.update({
  accessKeyId: process.env.SES_KEY, // stored in the .env file
  secretAccessKey: process.env.SES_SECRET, // stored in the .env file
  region: process.env.BUCKET_REGION // This refers to your bucket configuration.
});

const AWS_SES = new AWS.SES({apiVersion: 'latest'});

function SendMail(mailOptions) {
  let params = {
    Source: mailOptions.from,
    Destination: {
      ToAddresses: [
        mailOptions.to
      ],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: mailOptions.html,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: mailOptions.subject,
      }
    },
  };

  AWS_SES.sendEmail(params, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log('Email sent:');
      console.log(data);
    }
  });
}

module.exports = SendMail;