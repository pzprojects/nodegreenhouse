const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// fieldcrop Model
const Fieldcrop = require('../../models/fieldcrop');

/**
 * @route   GET api/fieldcrops
 * @desc    Get All fieldcrops
 * @access  Public
 */

router.get('/', async (req, res) => {
  try {
    const fieldcrops = await Fieldcrop.find();
    if (!fieldcrops) throw Error('לא נמצאו ירקות');

    res.status(200).json(fieldcrops);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   POST api/fieldcrops
 * @desc    Create An fieldcrop
 * @access  Private
 */

router.post('/', auth, async (req, res) => {
  const newfieldcrop = new Fieldcrop({
    name: req.body.name,
    price: req.body.price,
    averagecrop: req.body.averagecrop,
    amount: req.body.amount,
    numberofveginrow: req.body.numberofveginrow,
    moreinfolink: req.body.moreinfolink
  });

  try {
    const fieldcrop = await newfieldcrop.save();
    if (!fieldcrop) throw Error('תקלה בעת שמירת הירק');

    res.status(200).json(fieldcrop);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   DELETE api/fieldcrops/:id
 * @desc    Delete A fieldcrop
 * @access  Private
 */

router.delete('/:id', auth, async (req, res) => {
  try {
    const fieldcroptodelete = await Fieldcrop.findById(req.params.id);
    if (!fieldcroptodelete) throw Error('הירק לא קיים');

    const removed = await fieldcroptodelete.remove();
    if (!removed)
      throw Error('תקלה בעת מחיקת הירק');

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

module.exports = router;