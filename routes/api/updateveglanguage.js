const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// veglanguage Model
const Veglanguage = require('../../models/veglanguage');

// @route   POST api/updateveglanguage/:id
// @desc    Update veglanguage
// @access  Public
router.post('/:id', auth, (req, res) => {
  const { vegname, langconvert } = req.body;

  Veglanguage.findById(req.params.id, function (err, veglanguage) {

    try {

      if (!veglanguage) throw Error('No veglanguage found');

      // validate 
      if (!vegname) throw Error('One or more fields are empty');

      // no need for else since you are returning early ^
      veglanguage.vegname = vegname;
      veglanguage.langconvert = langconvert;
      veglanguage.save();
      if (!veglanguage) throw Error('Something went wrong saving the veglanguage');
  
      res.status(200).json(veglanguage);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });
});

module.exports = router;