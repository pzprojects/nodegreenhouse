const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// veglanguage Model
const Veglanguage = require('../../models/veglanguage');

/**
 * @route   GET api/veglanguages
 * @desc    Get All veglanguages
 * @access  Public
 */

router.get('/', async (req, res) => {
  try {
    const veglanguages = await Veglanguage.find();
    if (!veglanguages) throw Error('לא נמצאו שפות ירקות');

    res.status(200).json(veglanguages);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   POST api/veglanguages
 * @desc    Create An veglanguage
 * @access  Private
 */

router.post('/', auth, async (req, res) => {
  const newveglanguage = new Veglanguage({
    vegname: req.body.vegname,
    langconvert: req.body.langconvert
  });

  try {
    const veglanguage = await newveglanguage.save();
    if (!veglanguage) throw Error('תקלה בעת שמירת שפת הירק');

    res.status(200).json(veglanguage);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   DELETE api/veglanguages/:id
 * @desc    Delete A veglanguage
 * @access  Private
 */

router.delete('/:id', auth, async (req, res) => {
  try {
    const veglanguagetodelete = await Veglanguage.findById(req.params.id);
    if (!veglanguagetodelete) throw Error('שפה לא קיימת');

    const removed = await veglanguagetodelete.remove();
    if (!removed)
      throw Error('תקלה בעת מחיקת שפת הירק');

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

module.exports = router;