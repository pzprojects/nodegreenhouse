const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ResetMailFunctions = require('../../Services/resetmail');
const AWS = require('aws-sdk')

// Configuring AWS
AWS.config.update({
  accessKeyId: process.env.SES_KEY, // stored in the .env file
  secretAccessKey: process.env.SES_SECRET, // stored in the .env file
  region: process.env.BUCKET_REGION // This refers to your bucket configuration.
});

const AWS_SES = new AWS.SES({apiVersion: 'latest'});

// User Model
const User = require('../../models/User');

// `secret` is passwordHash concatenated with user's
// createdAt value, so if someone malicious gets the
// token they still need a timestamp to hack it:
const usePasswordHashToMakeToken = (
  password,id,register_date) => {
  // highlight-start
  const secret = password + "-" + register_date
  const token = jwt.sign({ id: id}, secret, { expiresIn: 3600 })
  // highlight-end
  return token
}

// @route   POST api/sendresetpasswordmail/:email
// @desc    Reset user password
// @access  Public
router.post('/:email', async (req, res) => {
    try {
      const user = await User.findOne({email: req.params.email});
      const token = usePasswordHashToMakeToken(user.password, user.id, user.register_date);
      const url = ResetMailFunctions.getPasswordResetURL(user, token);
      const emailTemplate = ResetMailFunctions.resetPasswordTemplate(user, url);
      console.log(emailTemplate);
      const sendEmail = () => {
        AWS_SES.sendEmail(emailTemplate, (err, info) => {
          if (err) {
            console.log(err);
            res.status(500).json("תקלה בעת שליחת מייל")
          }
        })
      }
      sendEmail();
    } catch (err) {
      res.status(404).json("המשתמש לא קיים")
    }
});

module.exports = router;