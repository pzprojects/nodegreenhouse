const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// system Model
const System = require('../../models/system');

/**
 * @route   GET api/systemconfig
 * @desc    Get systemconfig
 * @access  Public
 */

router.get('/', async (req, res) => {
    try {
      const system = await System.findOne();
      if (!system) throw Error('לא נמצאו נתוני מערכת');
  
      res.status(200).json(system);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
});

// @route   POST api/systemconfig/:id
// @desc    Update systemconfig
// @access  Public
router.post('/:id', auth, (req, res) => {
  const { hamamadefaultsize } = req.body;

  System.findById(req.params.id, function (err, system) {

    try {

      if (!system) throw Error('לא נמצאו נתוני מערכת');

      // validate 
      if (!hamamadefaultsize ) throw Error('One or more fields are empty');

      // no need for else since you are returning early ^
      system.hamamadefaultsize = hamamadefaultsize;

      system.save();
      if (!system) throw Error('תקלה בעת עדכון נתוני מערכת');
  
      res.status(200).json(system);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });
});

module.exports = router;