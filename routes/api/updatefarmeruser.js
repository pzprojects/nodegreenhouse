const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');

// @route   POST api/updatefarmeruser
// @desc    Update user
// @access  Public
router.post('/:id', auth, (req, res) => {
  const { name, familyname, phone, hamamasize, numberofactivefarms, imageurl, aboutme, choosenvegetables, choosenfieldcrops } = req.body;

  User.findById(req.params.id, function (err, user) {

    try {

      if (!user) throw Error('No account found');

      // validate 
      if (!name || !familyname || !phone || !hamamasize || !numberofactivefarms ) throw Error('One or more fields are empty');

      // no need for else since you are returning early ^
      user.name = name;
      user.familyname = familyname; // why do you have two? oh well
      user.phone = phone;
      user.hamamasize = hamamasize;
      user.numberofactivefarms = numberofactivefarms;
      user.imageurl = imageurl;
      user.aboutme = aboutme;
      user.choosenvegetables = choosenvegetables;
      user.choosenfieldcrops = choosenfieldcrops;

      user.save();
      if (!user) throw Error('Something went wrong saving the user');
  
      res.status(200).json(user);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });
});

module.exports = router;
