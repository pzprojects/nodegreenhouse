const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// grower Model
const Grower = require('../../models/grower');

// @route   POST api/deactivategrower/:email
// @desc    Deactivategrower grower
// @access  Public
router.post('/:email', auth, (req, res) => {
  const { chossenfarmer } = req.body;

  Grower.findOne({email: req.params.email, chossenfarmer: chossenfarmer}, function (err, grower) {

    try {

      if (!grower) throw Error('No grower found');

      // no need for else since you are returning early ^
      grower.isactive = false;

      grower.save();
      if (!grower) throw Error('Something went wrong saving the grower');
  
      res.status(200).json(grower);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });
});

module.exports = router;