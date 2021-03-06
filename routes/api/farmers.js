const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const SendMail = require('../../Services/mail');

// farmer Model
const Farmer = require('../../models/farmer');

/**
 * @route   GET api/farmers
 * @desc    Get All farmers
 * @access  Public
 */

router.get('/', async (req, res) => {
  try {
    const farmers = await Farmer.find();
    if (!farmers) throw Error('No farmers');

    res.status(200).json(farmers);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   GET api/farmers/:sizearea?/:plan?
 * @desc    Get farmers by sizearea and plan
 * @access  Public
 */

router.get('/:sizearea?/:plan?', async (req, res) => {
  try {
    var query = { sizearea: req.params.sizearea };
    var farmers = await Farmer.find(query);
    if(req.params.plan !== null && req.params.plan !== '' && req.params.plan !== undefined && req.params.plan !== "undefined"){
      farmers = await farmers.filter(farmerUser => farmerUser.plans.some(item => item.name === req.params.plan));
    }
    if (!farmers) throw Error('No farmers');

    res.status(200).json(farmers);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   POST api/farmers
 * @desc    Create An Farmer
 * @access  Private
 */

router.post('/', async (req, res) => {

  const newfarmer = new Farmer({
    name: req.body.name,
    familyname: req.body.familyname,
    phone: req.body.phone,
    email: req.body.email,
    sizearea: req.body.sizearea,
    hamamasize: req.body.hamamasize,
    numberofactivefarms: req.body.numberofactivefarms,
    aboutme: req.body.aboutme,
    imageurl: req.body.imageurl,
    choosenvegetables: req.body.choosenvegetables,
    choosenfieldcrops: req.body.choosenfieldcrops,
    plans: req.body.plans,
    address: req.body.address,
    fieldcropplan: req.body.fieldcropplan
  });

  try {
    Farmer.findOne({ email: req.body.email }).then(farmer => {if(farmer) throw Error('Farmer already exists')});

    const farmer = await newfarmer.save();
    if (!farmer) throw Error('Farmer went wrong saving the farmer');

    // Mail to farmer when he join's
    var FarmerMailBody = '<div dir="rtl" style="text-align:center;font-size:14px;"><p>חקלאי יקר,</p>';
    FarmerMailBody += '<p>תודה רבה על פנייתך להצטרפות לקהילת CO-GREENHOUSE</p>';
    FarmerMailBody += '<p>פרטייך הגיעו אלינו ובקרוב ניצור קשר </p></br>';
    FarmerMailBody += '<p>תודה,</p>';
    FarmerMailBody += '<p>קהילת GREENHOUSE-CO</p></div><br>';
    FarmerMailBody += '<p style="text-align:center;"><img src="https://profileimages12.s3-eu-west-1.amazonaws.com/GreenhouseAssets/logo.png" alt="logo" style="width:200px;height:60px;"></p></div>';

    // Mail to system admin
    var ManagerMailBody = '<div dir="rtl" style="text-align:center;font-size:14px;"><p>שלום רב,</p>';
    ManagerMailBody += '<p>' + 'החקלאי ' + newfarmer.name + " " + newfarmer.familyname + ' (' + newfarmer.email + ') שלח בקשת הצטרפות לקהילה.</p>';
    ManagerMailBody += '<p><a href="' + process.env.Site_HomePage_Url + '" target="_blank" style="font-weight:bold;text-decoration:none;" >לצפיה בפרטים שהזין</a></p></br>';
    ManagerMailBody += '<p>תודה,</p>';
    ManagerMailBody += '<p>קהילת GREENHOUSE-CO</p><br>';
    ManagerMailBody += '<p style="text-align:center;"><img src="https://profileimages12.s3-eu-west-1.amazonaws.com/GreenhouseAssets/logo.png" alt="logo" style="width:200px;height:60px;"></p></div>';

    var ManagermailOptions = {
        from: process.env.Email_User,
        to: process.env.Email_User,
        subject: '🌻 הצטרפות חקלאי לקהילה 🌻',
        html: ManagerMailBody
    };

    var FarmermailOptions = {
        from: process.env.Email_User,
        to: newfarmer.email,
        subject: '🌻 תודה על הצטרפותך לקהילת CO-Greenhouse 🌻',
        html: FarmerMailBody
    };

    SendMail(FarmermailOptions);
    SendMail(ManagermailOptions);

    res.status(200).json(farmer);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
  
});

/**
 * @route   DELETE api/farmers/:id
 * @desc    Delete A farmer
 * @access  Private
 */

router.delete('/:id', async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.params.id);
    if (!farmer) throw Error('No farmer found');

    const removed = await farmer.remove();
    if (!removed)
      throw Error('Something went wrong while trying to delete the farmer');

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

module.exports = router;