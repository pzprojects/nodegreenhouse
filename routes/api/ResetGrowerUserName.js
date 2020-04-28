const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// grower Model
const Grower = require('../../models/grower');

// @route   POST api/ResetGrowerUserName/:email
// @desc    Reset Grower UserName
// @access  Public
router.post('/:email', auth, (req, res) => {
  const { email } = req.body;

  Grower.findOne({email: req.params.email}, function (err, grower) {

    try {

      if (!grower) throw Error('No grower found');

      // validate 
      if (!email) throw Error('One or more fields are empty');

      // no need for else since you are returning early ^
      grower.email = email;

      grower.save();
      if (!grower) throw Error('Something went wrong saving the grower');

      res.status(200).json(grower);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });
});

module.exports = router;