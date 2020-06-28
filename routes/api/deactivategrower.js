const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const SendMail = require('../../Services/mail');

// grower Model
const Grower = require('../../models/grower');

// @route   POST api/deactivategrower/:email
// @desc    Deactivategrower grower
// @access  Public
router.post('/:email', auth, (req, res) => {
  const { chossenfarmer } = req.body;

  Grower.findOne({email: req.params.email, chossenfarmer: chossenfarmer}, function (err, grower) {

    try {

      if (!grower) throw Error('No grower found');

      // no need for else since you are returning early ^
      grower.isactive = false;

      grower.save();
      if (!grower) throw Error('Something went wrong saving the grower');

      // Mail to farmer to notify that grower deactivate plan
      var FarmerMailBody = '<div dir="rtl" style="text-align:center;font-size:14px;"><p>שלום ' + grower.chossenfarmerfullname + ',</p>';
      FarmerMailBody += '<p>המגדל ' + grower.name + ' ' + grower.familyname  + ' עוזב את קהילתנו.</p>';
      FarmerMailBody += '<p>לאחר תום תקופת היבול של גידוליו עזיבת קהילתנו תממש.</p>';
      FarmerMailBody += '<p>תודה,</p>';
      FarmerMailBody += '<p>קהילת GREENHOUSE-CO</p><br>';
      FarmerMailBody += '<p style="text-align:center;"><img src="https://profileimages12.s3-eu-west-1.amazonaws.com/GreenhouseAssets/logo.png" alt="logo" style="width:200px;height:60px;"></p>';

  
      var mailOptions = {
        from: process.env.Email_User,
        to: grower.chossenfarmer,
        subject: 'הפסקת מנוי חודשי',
        html: FarmerMailBody
      };

      SendMail(mailOptions);
  
      res.status(200).json(grower);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });
});

module.exports = router;