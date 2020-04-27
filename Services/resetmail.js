require('dotenv').config();
var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.Email_User,
    pass: process.env.Email_Password
  }
})

function getPasswordResetURL(user, token){
  return `${process.env.Site_HomePage_Url}/UpdatePassword/${user._id}/${token}`;
}

function resetPasswordTemplate(user, url){
  const from = process.env.Email_User
  const to = user.email
  const subject = "🌻 איפוס סיסמה CO-Greenhouse 🌻"
  const html = `
  <p>הי ${user.name || user.email},</p>
  <p>בכדי לאפס את סיסמתך למערכת CO-Greenhouse עליך ללחוץ על הקישור ולעדכן סיסמה חדשה</p>
  <a href=${url}>אפס סיסמה</a>
  <p>במידה ולא תשתמש בקישור בשעה הקרובה תוקפו יפוג ולא תוכל להשתמש בו בשנית.</p>
  <p>בברכה,</p>
  <p>CO-Greenhouse</p>
  `

  return { from, to, subject, html }
}

module.exports.transporter = transporter;
module.exports.getPasswordResetURL = getPasswordResetURL;
module.exports.resetPasswordTemplate = resetPasswordTemplate;