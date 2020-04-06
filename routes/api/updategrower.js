const express = require('express');
const multer = require('multer');
const router = express.Router();
const auth = require('../../middleware/auth');

// grower Model
const Grower = require('../../models/grower');

// @route   POST api/updategrower/:email
// @desc    Update grower
// @access  Public
router.post('/:email', auth, (req, res) => {
  const { name, familyname, phone, address, imageurl } = req.body;

  Grower.findOne({email: req.params.email}, function (err, grower) {

    try {

      if (!grower) throw Error('No grower found');

      // validate 
      if (!name || !familyname || !phone || !address) throw Error('One or more fields are empty');

      // no need for else since you are returning early ^
      grower.name = name;
      grower.familyname = familyname; // why do you have two? oh well
      grower.phone = phone;
      grower.address = address;
      grower.imageurl = imageurl;

      grower.save();
      if (!grower) throw Error('Something went wrong saving the grower');
  
      res.status(200).json(grower);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });
});

module.exports = router;