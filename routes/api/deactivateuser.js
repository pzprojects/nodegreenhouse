const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const SendMail = require('../../Services/mail');

// User Model
const User = require('../../models/User');

// @route   POST api/deactivateuser
// @desc    Deactivate user
// @access  Public
router.post('/:id', auth, (req, res) => {
  const { workingwith } = req.body;

  User.findById(req.params.id, function (err, user) {

    try {

      if (!user) throw Error('No account found');

      // no need for else since you are returning early ^
      user.workingwith = workingwith;
      user.save();
      if (!user) throw Error('Something went wrong saving the user');

      let RegisterDate = new Date();
      let RegisterDateToStringFormat = RegisterDate.getDate() + "/"+ parseInt(RegisterDate.getMonth()+1) +"/"+RegisterDate.getFullYear();

      // Mail to grower deactivate plan
      var GrowerMailBody = '<div dir="rtl" style="text-align:center;font-size:14px;"><p>שלום ' + user.name + '</p>';
      GrowerMailBody += '<p>צר לנו שבחרת לעזוב את קהילת CO- GREENHOUSE.</p>';
      GrowerMailBody += '<p>אנו מאמינים בהתנסות, בהסקת מסקנות ושיפורים. אנו עושים את מירב</p>';
      GrowerMailBody += '<p>המאמצים כדי להשתפר ולהפוך את CO-GREENHOUSE לחווית </p>';
      GrowerMailBody += '<p>הגידול וצריכת המזון הבריאה, הנכונה והייחודית ביותר.</p>';
      GrowerMailBody += '<p>נשמח אם תשתף אותנו מדוע החלטת להפסיק את המנוי:</p>';
      GrowerMailBody += '<p>-	לא נהנתי משיתוף הפעולה עם החקלאי</p>';
      GrowerMailBody += '<p>-	לא מצאתי מסלול שמתאים לי</p>';
      GrowerMailBody += '<p>-	יקר לי מידי</p>';
      GrowerMailBody += '<p>רוצה לספר לנו יותר ?</p>';
      GrowerMailBody += '<p>שלח לנו מייל וספר לנו בהרחבה על החוויה שלך </p>';
      GrowerMailBody += '<p>ב- CO-GREENHOUSE.</p>';
      GrowerMailBody += '<p>תוכל כמובן לאסוף את גידולייך בתיאום עם החקלאי שלך.</p>';
      GrowerMailBody += '<p>תמיד אפשר להתחרט ונשמח שתחדש את החברות בקהילה.</p><br>';
      GrowerMailBody += '<p style="text-align:center;"><img src="https://profileimages12.s3-eu-west-1.amazonaws.com/GreenhouseAssets/logo.png" alt="logo" style="width:200px;height:60px;"></p></div>';

      // Mail to system admin
      var ManagerMailBody = '<div dir="rtl" style="text-align:center;font-size:14px;"><p>שלום רב,</p>';
      ManagerMailBody += '<p>' + 'המגדל ' + user.name + " " + user.familyname + ' (' + user.email + ') בחר לעזוב את הקהילה בתאריך ' + RegisterDateToStringFormat + '.</p>';
      ManagerMailBody += '<p><a href="' + process.env.Site_HomePage_Url + '" target="_blank" style="font-weight:bold;text-decoration:none;" >לצפיה בפרטים שהזין</a></p></br>';
      ManagerMailBody += '<p>תודה,</p>';
      ManagerMailBody += '<p>קהילת GREENHOUSE-CO</p><br>';
      ManagerMailBody += '<p style="text-align:center;"><img src="https://profileimages12.s3-eu-west-1.amazonaws.com/GreenhouseAssets/logo.png" alt="logo" style="width:200px;height:60px;"></p></div>';


      var mailOptions = {
        from: process.env.Email_User,
        to: user.email,
        subject: 'הפסקת מנוי חודשי',
        html: GrowerMailBody
      };

      var ManagermailOptions = {
        from: process.env.Email_User,
        to: process.env.Email_User,
        subject: '🌻 הפסקת מנוי חודשי מחקלאי 🌻',
        html: ManagerMailBody
      };

      SendMail(mailOptions);
      SendMail(ManagermailOptions);

      res.status(200).json(user);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });
});

module.exports = router;
