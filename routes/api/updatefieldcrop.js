const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// fieldcrop Model
const Fieldcrop = require('../../models/fieldcrop');

// @route   POST api/updatefieldcrop/:id
// @desc    Update fieldcrop
// @access  Public
router.post('/:id', auth, (req, res) => {
  const { name, price, averagecrop, amount, numberofveginrow, moreinfolink } = req.body;

  Fieldcrop.findById(req.params.id, function (err, fieldcrop) {

    try {

      if (!fieldcrop) throw Error('No fieldcrop found');

      // validate 
      if (!name || !price || !averagecrop || !amount || !numberofveginrow || !moreinfolink) throw Error('One or more fields are empty');

      // no need for else since you are returning early ^
      fieldcrop.name = name;
      fieldcrop.price = price; // why do you have two? oh well
      fieldcrop.averagecrop = averagecrop;
      fieldcrop.amount = amount;
      fieldcrop.numberofveginrow = numberofveginrow;
      fieldcrop.moreinfolink = moreinfolink;

      fieldcrop.save();
      if (!fieldcrop) throw Error('Something went wrong saving the fieldcrop');
  
      res.status(200).json(fieldcrop);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });
});

module.exports = router;