const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// vegetable Model
const vegetable = require('../../models/vegetable');

/**
 * @route   GET api/vegetables
 * @desc    Get All vegetables
 * @access  Public
 */

router.get('/', async (req, res) => {
  try {
    const vegetables = await vegetable.find();
    if (!vegetables) throw Error('לא נמצאו ירקות');

    res.status(200).json(vegetables);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   POST api/vegetables
 * @desc    Create An vegetable
 * @access  Private
 */

router.post('/', auth, async (req, res) => {
  const newvegetable = new vegetable({
    name: req.body.name,
    price: req.body.price,
    averagecrop: req.body.averagecrop,
    amount: req.body.amount,
    numberofveginrow: req.body.numberofveginrow,
    moreinfolink: req.body.moreinfolink
  });

  try {
    const vegetable = await newvegetable.save();
    if (!vegetable) throw Error('תקלה בעת שמירת הירק');

    res.status(200).json(vegetable);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   DELETE api/vegetables/:id
 * @desc    Delete A vegetable
 * @access  Private
 */

router.delete('/:id', auth, async (req, res) => {
  try {
    const vegetabletodelete = await vegetable.findById(req.params.id);
    if (!vegetabletodelete) throw Error('הירק לא קיים');

    const removed = await vegetabletodelete.remove();
    if (!removed)
      throw Error('תקלה בעת מחיקת הירק');

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

module.exports = router;