const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');

// @route   POST api/ResetUserName/:email
// @desc    Reset Grower UserName
// @access  Public
router.post('/:email', auth, (req, res) => {
  const { email } = req.body;

  User.findOne({email: req.params.email}, function (err, user) {

    try {

      if (!user) throw Error('No account found');

      // validate 
      if (!email) throw Error('One or more fields are empty');

      // no need for else since you are returning early ^
      user.email = email;

      user.save();
      if (!user) throw Error('Something went wrong saving the user');
  
      res.status(200).json(user);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });
});

module.exports = router;