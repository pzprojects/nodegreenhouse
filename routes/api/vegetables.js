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
    if (!vegetables) throw Error('No vegetables');

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
    name: req.body.name
  });

  try {
    const vegetable = await newvegetable.save();
    if (!vegetable) throw Error('Something went wrong saving the vegetable');

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
    const vegetable = await vegetable.findById(req.params.id);
    if (!vegetable) throw Error('No vegetable found');

    const removed = await vegetable.remove();
    if (!removed)
      throw Error('Something went wrong while trying to delete the vegetable');

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

module.exports = router;