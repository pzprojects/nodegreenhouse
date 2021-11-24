const express = require('express');
const router = express.Router();
const SendMail = require('../../Services/mail');


/**
 * @route   POST api/sendpaymentdata
 * @desc    POST api/sendpaymentdata
 * @access  Private
 */

 router.post('/', async (req, res) => {

    const fullname = req.body.fullname;
    const accountnumber = req.body.accountnumber;
    const bankname = req.body.bankname;
    const banknumber = req.body.banknumber;
    const email = req.body.email;
    const phone = req.body.phone;
    const farmerfullname = req.body.farmerfullname;
 
     // Mail to system admin
     var ManagerMailBody = '<div dir="rtl" style="text-align:center;font-size:14px;"><p>שלום רב,</p>';
     ManagerMailBody += '<p>' + 'החקלאי ' + farmerfullname + ' (' + email + ') שלח בקשה לעדכון הוראת קבע.</p>';
     ManagerMailBody += '<p>' + 'פרטי התשלום של החקלאי הם: </p>';
     ManagerMailBody += '<p>' + '* שם בעל החשבון - ' + fullname + '</p>';
     ManagerMailBody += '<p>' + '* מספר חשבון -  ' + accountnumber + '</p>';
     ManagerMailBody += '<p>' + '* שם הבנק -  ' + bankname + '</p>';
     ManagerMailBody += '<p>' + '* סניף - ' + banknumber + '</p>';
     ManagerMailBody += '<p>' + 'ניתן ליצור קשר עם החקלאי בטלפון ' + phone + '</p>';
     ManagerMailBody += '<p><a href="' + process.env.Site_HomePage_Url + '" target="_blank" style="font-weight:bold;text-decoration:none;" >לצפיה בפרטים שהזין</a></p></br>';
     ManagerMailBody += '<p>תודה,</p>';
     ManagerMailBody += '<p>קהילת GREENHOUSE-CO</p><br>';
     ManagerMailBody += '<p style="text-align:center;"><img src="https://profileimages12.s3-eu-west-1.amazonaws.com/GreenhouseAssets/logo.png" alt="logo" style="width:200px;height:60px;"></p></div>';
 
     var ManagermailOptions = {
         from: process.env.Email_User,
         to: process.env.ACC_MANAGER_EMAIL,
         subject: '🌻 עדכון אמצעי תשלום של חקלאי 🌻',
         html: ManagerMailBody
     };
 
     SendMail(ManagermailOptions);

    try {
        res.status(200).json({ msg: "Recived" });
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

module.exports = router;