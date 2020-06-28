const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const SendMail = require('../../Services/mail');

// grower Model
const Grower = require('../../models/grower');

/**
 * @route   GET api/growers
 * @desc    Get All growers
 * @access  Public
 */

router.get('/', async (req, res) => {
  try {
    const growers = await Grower.find();
    if (!growers) throw Error('No growers');

    res.status(200).json(growers);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   GET api/growers/:email
 * @desc    Get farmer growers
 * @access  Public
 */

router.get('/:email', async (req, res) => {
  try {
    var query = { chossenfarmer: req.params.email };
    const growers = await Grower.find(query);
    if (!growers) throw Error('No growers');

    res.status(200).json(growers);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   POST api/growers
 * @desc    Create An grower
 * @access  Private
 */

router.post('/', async (req, res) => {

  const newgrower = new Grower({
    name: req.body.name,
    familyname: req.body.familyname,
    phone: req.body.phone,
    email: req.body.email,
    sizearea: req.body.sizearea,
    address: req.body.address,
    imageurl: req.body.imageurl,
    choosenvegetables: req.body.choosenvegetables,
    choosenfieldcrops: req.body.choosenfieldcrops,
    plan: req.body.plan,
    chossenfarmer: req.body.chossenfarmer,
    chossenfarmerfullname: req.body.chossenfarmerfullname,
    totalpayment: req.body.totalpayment,
    isactive: req.body.isactive,
    fieldcropplan: req.body.fieldcropplan
  });

  try {
    Grower.findOne({ email: req.body.email }).then(grower => {if(grower) throw Error('Grower already exists')});

    const grower = await newgrower.save();
    if (!grower) throw Error('Something went wrong saving the grower');

    // Mail to grower when he join's
    var GrowerMailBody = '<div dir="rtl" style="text-align:center;font-size:14px;"><p style="font-size:16px;font-weight:bold;">ברוכים הבאים ל- CO-GREENHOUSE!</p>';
    GrowerMailBody += '<p>אנו שמחים שבחרת לקחת את האחריות לידך על מנת להעניק לך ולסביבתך חווית גידול ייחודית</p>';
    GrowerMailBody += '<p>המאפשרת לכם לקחת חלק פעיל ככל שתבחרו בתהליך גידול הירקות אותם אתם צורכים</p>';
    GrowerMailBody += '<p>תוך תמיכה פעילה בחקלאים.</p>';
    GrowerMailBody += '<p>מהיום יש לך חלקה בליווי החקלאי שבחרת, אתם פועלים יחד בחוויה </p>';
    GrowerMailBody += '<p>חקלאית משותפת למען גידולים איכותיים ומזינים.</p>';
    GrowerMailBody += '<p>ניתן תמיד להיות איתנו בקשר במייל:</p>';
    GrowerMailBody += '<p>Info.cogreenhouse@gmail.com</p><br>';
    GrowerMailBody += '<p style="text-align:center;"><img src="https://profileimages12.s3-eu-west-1.amazonaws.com/GreenhouseAssets/logo.png" alt="logo" style="width:200px;height:60px;"></p></div>';

    // Mail to system admin
    var ManagerMailBody = '<div dir="rtl" style="text-align:center;font-size:14px;"><p>שלום רב,</p>';
    ManagerMailBody += '<p>' + 'המגדל ' + newgrower.name + " " + newgrower.familyname + ' (' + newgrower.email + ') הצטרף לקהילה.</p>';
    ManagerMailBody += '<p><a href="' + process.env.Site_HomePage_Url + '" target="_blank" style="font-weight:bold;text-decoration:none;" >לצפיה בפרטים שהזין</a></p></br>';
    ManagerMailBody += '<p>תודה,</p>';
    ManagerMailBody += '<p>קהילת GREENHOUSE-CO</p><br>';
    ManagerMailBody += '<p style="text-align:center;"><img src="https://profileimages12.s3-eu-west-1.amazonaws.com/GreenhouseAssets/logo.png" alt="logo" style="width:200px;height:60px;"></p></div>';

    // Mail to notify farmer
    var FarmerMailBody = '<div dir="rtl" style="text-align:center;font-size:14px;"><p style="font-size:16px;font-weight:bold;">מזל טוב!</p>';
    FarmerMailBody += '<p>' + 'המגדל ' + newgrower.name + " " + newgrower.familyname + ' בחר להצטרף לחלקה שלך</p>';
    FarmerMailBody += '<p>צרו קשר לקביעת פגישת היכרות</p>';
    FarmerMailBody += '<p>והחלו בחווית הגידול יחדיו.</p></br>';
    FarmerMailBody += '<p><a href="' + process.env.Site_HomePage_Url + '" target="_blank" style="font-size:12px;font-weight:bold;" style="font-weight:bold;text-decoration:none;">לצפייה בפרטי המגדל</a></p></br>';
    FarmerMailBody += '<p>תודה,</p>';
    FarmerMailBody += '<p>קהילת GREENHOUSE-CO</p><br>';
    FarmerMailBody += '<p style="text-align:center;"><img src="https://profileimages12.s3-eu-west-1.amazonaws.com/GreenhouseAssets/logo.png" alt="logo" style="width:200px;height:60px;"></p></div>';

    var ManagermailOptions = {
        from: process.env.Email_User,
        to: process.env.Email_User,
        subject: '🌻 הצטרפות חקלאי לקהילה 🌻',
        html: ManagerMailBody
    };

    var GrowermailOptions = {
        from: process.env.Email_User,
        to: newgrower.email,
        subject: '🌻 תודה על הצטרפותך לקהילת CO-Greenhouse 🌻',
        html: GrowerMailBody
    };

    var FarmermailOptions = {
        from: process.env.Email_User,
        to: newgrower.chossenfarmer,
        subject: '🌻 הצטרפות מגדל 🌻',
        html: FarmerMailBody
    };

    SendMail(GrowermailOptions);
    SendMail(FarmermailOptions);
    SendMail(ManagermailOptions);

    res.status(200).json(grower);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
  
});

/**
 * @route   DELETE api/growers/:id
 * @desc    Delete A grower
 * @access  Private
 */

router.delete('/:id', async (req, res) => {
  try {
    const grower = await Grower.findById(req.params.id);
    if (!grower) throw Error('No farmer found');

    const removed = await grower.remove();
    if (!removed)
      throw Error('Something went wrong while trying to delete the farmer');

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

module.exports = router;