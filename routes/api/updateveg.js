const express = require('express');
const multer = require('multer');
const router = express.Router();
const auth = require('../../middleware/auth');

// Vegetable Model
const Vegetable = require('../../models/vegetable');

// @route   POST api/updateveg/:id
// @desc    Update vegetable
// @access  Public
router.post('/:id', auth, (req, res) => {
  const { name, price, averagecrop, amount, numberofveginrow, moreinfolink } = req.body;

  Vegetable.findById(req.params.id, function (err, vegetable) {

    try {

      if (!vegetable) throw Error('No vegetable found');

      // validate 
      if (!name || !price || !averagecrop || !amount || !numberofveginrow || !moreinfolink) throw Error('One or more fields are empty');

      // no need for else since you are returning early ^
      vegetable.name = name;
      vegetable.price = price; // why do you have two? oh well
      vegetable.averagecrop = averagecrop;
      vegetable.amount = amount;
      vegetable.numberofveginrow = numberofveginrow;
      vegetable.moreinfolink = moreinfolink;

      vegetable.save();
      if (!vegetable) throw Error('Something went wrong saving the vegetable');
  
      res.status(200).json(vegetable);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });
});

module.exports = router;