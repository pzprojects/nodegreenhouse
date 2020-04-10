const express = require('express');
const multer = require('multer');
const router = express.Router();

// User Model
const User = require('../../models/User');

// @route   POST api/updateruseractivefarms
// @desc    Updateruseractivefarms user
// @access  Public
router.post('/:email', (req, res) => {
  const { numberofactivefarms } = req.body;

  User.findOne({email: req.params.email}, function (err, user) {

    try {

      if (!user) throw Error('No account found');

      // validate 
      if (!numberofactivefarms) throw Error('One or more fields are empty');

      // no need for else since you are returning early ^
      user.numberofactivefarms = numberofactivefarms;

      user.save();
      if (!user) throw Error('Something went wrong saving the user');
  
      res.status(200).json(user);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });
});

module.exports = router;