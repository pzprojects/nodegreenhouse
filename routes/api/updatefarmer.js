const express = require('express');
const multer = require('multer');
const router = express.Router();
const auth = require('../../middleware/auth');

// farmer Model
const Farmer = require('../../models/farmer');

// @route   POST api/updatefarmer/:email
// @desc    Update farmer
// @access  Public
router.post('/:email', auth, (req, res) => {
  const { name, familyname, phone, hamamasize, numberofactivefarms, imageurl, aboutme, choosenvegetables } = req.body;

  Farmer.findOne({email: req.params.email}, function (err, farmer) {

    try {

      if (!farmer) throw Error('No farmer found');

      // validate 
      if (!name || !familyname || !phone || !hamamasize || !numberofactivefarms) throw Error('One or more fields are empty');

      // no need for else since you are returning early ^
      farmer.name = name;
      farmer.familyname = familyname; // why do you have two? oh well
      farmer.phone = phone;
      farmer.hamamasize = hamamasize;
      farmer.numberofactivefarms = numberofactivefarms;
      farmer.imageurl = imageurl;
      farmer.aboutme = aboutme;
      farmer.choosenvegetables = choosenvegetables;

      farmer.save();
      if (!farmer) throw Error('Something went wrong saving the farmer');
  
      res.status(200).json(farmer);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });
});

module.exports = router;