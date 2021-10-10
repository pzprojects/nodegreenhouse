const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// farmer Veglog
const Veglog = require('../../models/veglog');

/**
 * @route   GET api/veglogs
 * @desc    Get All Veglogs
 * @access  Public
 */

router.get('/', async (req, res) => {
    try {
      const veglogs = await Veglog.find();
      if (!veglogs) throw Error('לא נמצאו נתונים');
      console.log();
  
      res.status(200).json(veglogs);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
});

/**
 * @route   POST api/veglogs
 * @desc    Create An Veglog
 * @access  Private
 */

router.post('/', auth, async (req, res) => {
    const newveglog = new Veglog({
      farmername: req.body.farmername,
      farmeremail: req.body.farmeremail,
      vegetablesafterchange: req.body.vegetablesafterchange,
    });
  
    try {
      const veglog = await newveglog.save();
      if (!veglog) throw Error('תקלה בעת שמירת הלוג');
  
      res.status(200).json(veglog);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
});

/**
 * @route   DELETE api/veglogs/:id
 * @desc    Delete A Veglog
 * @access  Private
 */

router.delete('/:id', auth, async (req, res) => {
    try {
      const veglogtodelete = await Veglog.findById(req.params.id);
      if (!veglogtodelete) throw Error('הלוג לא קיים');
  
      const removed = await veglogtodelete.remove();
      if (!removed)
        throw Error('תקלה בעת מחיקת הלוג');
  
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ msg: e.message, success: false });
    }
});

module.exports = router;