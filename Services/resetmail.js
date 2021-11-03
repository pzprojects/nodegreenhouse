try {
  require('dotenv').config();
} catch (error) {
  // Do nothing
}

function getPasswordResetURL(user, token){
  return `${process.env.Site_HomePage_Url}/UpdatePassword/${user._id}/${token}`;
}

function resetPasswordTemplate(user, url){
  const from = process.env.Email_User
  const to = user.email
  const subject = "🌻 איפוס סיסמה CO-Greenhouse 🌻"
  const html = `<div dir="rtl" style="text-align:center;font-size:14px;">
  <p>שלום ${user.name || user.email},</p>
  <p>בכדי לאפס את סיסמתך למערכת CO-Greenhouse עליך ללחוץ על הקישור ולעדכן סיסמה חדשה</p>
  <a href=${url} style="font-weight:bold;text-decoration:none;">אפס סיסמה</a>
  <p>במידה ולא תשתמש בקישור בשעה הקרובה תוקפו יפוג ולא תוכל להשתמש בו בשנית.</p>
  <p>בברכה,</p>
  <p>CO-Greenhouse</p><br>
  <p style="text-align:center;"><img src="https://profileimages12.s3-eu-west-1.amazonaws.com/GreenhouseAssets/logo.png" alt="logo" style="width:200px;height:60px;"></p></div>
  `

  let params = {
    Source: from,
    Destination: {
      ToAddresses: [
        to
      ],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: html,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      }
    },
  };

  return params;
}

module.exports.getPasswordResetURL = getPasswordResetURL;
module.exports.resetPasswordTemplate = resetPasswordTemplate;