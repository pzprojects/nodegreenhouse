require('dotenv').config();
var nodemailer = require('nodemailer');


function SendMail(mailOptions) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.Email_User,
          pass: process.env.Email_Password
        }
      });

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {

        }
      });
 }

 module.exports = SendMail;