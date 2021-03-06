const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const SendMail = require('../../Services/mail');

// Myshopitem Model
const Myshopitem = require('../../models/myshopitem');

/**
 * @route   GET api/myshopitems
 * @desc    Get All myshopitems
 * @access  Public
 */

router.get('/', async (req, res) => {
  try {
    const myshopitems = await Myshopitem.find();
    if (!myshopitems) throw Error('No shop items');

    res.status(200).json(myshopitems);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   POST api/myshopitems
 * @desc    Create An myshopitem
 * @access  Private
 */

router.post('/', auth, async (req, res) => {

  const newmyshopitem = new Myshopitem({
    growername: req.body.growername,
    groweremail: req.body.groweremail,
    farmername: req.body.farmername,
    farmeremail: req.body.farmeremail,
    totalpayed: req.body.totalpayed,
    growershoopinglist: req.body.growershoopinglist,
  });

  try {
    const myshopitem = await newmyshopitem.save();
    if (!myshopitem) throw Error('Something went wrong saving the shop item');

    // Mail Format for all
    var AllMailBody = '<p>פרטי ההזמנה:</p>';
    for (var i = 0; i < myshopitem.growershoopinglist.length; i++) {
        AllMailBody += '<p>' + myshopitem.growershoopinglist[i].ChoosenVegAmount + ' שתילי ' + myshopitem.growershoopinglist[i].ChoosenVegName +
        ' בעלות של ' + myshopitem.growershoopinglist[i].ChoosenVegPrice + ' ש"ח ליחידה.' + '</p>';
    }
    AllMailBody += '<p>הסכום הכולל לתשלום הוא: ' + myshopitem.totalpayed + ' ש"ח.</p>';
    AllMailBody += '<p>תודה,</p>';
    AllMailBody += '<p>קהילת GREENHOUSE-CO</p><br>';
    AllMailBody += '<p style="text-align:center;"><img src="https://profileimages12.s3-eu-west-1.amazonaws.com/GreenhouseAssets/logo.png" alt="logo" style="width:200px;height:60px;"></p></div>';

    // Mail Format for Cogreenhouse
    var ManagerMailBody = '<div dir="rtl" style="text-align:center;font-size:14px;"><p>שלום,</p>';
    ManagerMailBody += '<p>' + 'המגדל ' + myshopitem.growername + ' (' + myshopitem.groweremail + ') ' + ' שחממתו באחריות החקלאי  ' + myshopitem.farmername + ' (' + myshopitem.farmeremail + ') ביצע הזמנת שתילים נוספת.' + '</p>';
    ManagerMailBody += AllMailBody;

    var ManagermailOptions = {
        from: process.env.Email_User,
        to: process.env.Email_User,
        subject: '🌻 רכישת שתילים מחקלאי 🌻',
        html: ManagerMailBody
    };

    // Mail Format for grower
    var GrowerMailBody = '<div dir="rtl" style="text-align:center;font-size:14px;"><p>שלום ' + myshopitem.growername + ', </p>';
    GrowerMailBody += '<p>תודה שרכשת שתילים מהחקלאי ' + myshopitem.farmername + ' (' + myshopitem.farmeremail + ').' + '</p>';
    GrowerMailBody += AllMailBody;

    var GrowermailOptions = {
        from: process.env.Email_User,
        to: myshopitem.groweremail,
        subject: '🌻 פירוט רכישת שתילים מחקלאי 🌻',
        html: GrowerMailBody
    };

    // Mail Format for Farmer
    var FarmerMailBody = '<div dir="rtl" style="text-align:center;font-size:14px;"><p>שלום ' + myshopitem.farmername + ', </p>';
    FarmerMailBody += '<p>התקבלה בקשה לרכישת שתילים על ידי ' + myshopitem.growername + ' (' + myshopitem.groweremail + ').' + '</p>';
    FarmerMailBody += AllMailBody;

    var FarmermailOptions = {
        from: process.env.Email_User,
        to: myshopitem.farmeremail,
        subject: '🌻 הזמנת שתילים חדשה 🌻',
        html: FarmerMailBody
    };

    SendMail(ManagermailOptions);
    SendMail(GrowermailOptions);
    SendMail(FarmermailOptions);

    res.status(200).json(myshopitem);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
  
});

/**
 * @route   DELETE api/myshopitems/:id
 * @desc    Delete A myshopitem
 * @access  Private
 */

router.delete('/:id', auth, async (req, res) => {
  try {
    const myshopitem = await Myshopitem.findById(req.params.id);
    if (!myshopitem) throw Error('No shop item found');

    const removed = await myshopitem.remove();
    if (!removed)
      throw Error('Something went wrong while trying to delete the shop item');

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

module.exports = router;