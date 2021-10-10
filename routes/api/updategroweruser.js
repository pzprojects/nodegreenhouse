const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');

// @route   POST api/updategroweruser
// @desc    Update user
// @access  Public
router.post('/:id', auth, (req, res) => {
  const { name, familyname, phone, address, imageurl } = req.body;

  User.findById(req.params.id, function (err, user) {

    try {

      if (!user) throw Error('No account found');

      // validate 
      if (!name || !familyname || !phone || !address) throw Error('One or more fields are empty');
      console.log('hi');

      // no need for else since you are returning early ^
      user.name = name;
      user.familyname = familyname; // why do you have two? oh well
      user.phone = phone;
      user.address = address;
      user.imageurl = imageurl;

      user.save();
      if (!user) throw Error('Something went wrong saving the user');
  
      res.status(200).json(user);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });
});

module.exports = router;
