const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// grower Model
const Grower = require('../../models/grower');

/**
 * @route   GET api/growers
 * @desc    Get All growers
 * @access  Public
 */

router.get('/', async (req, res) => {
  try {
    const growers = await Grower.find();
    if (!growers) throw Error('No growers');

    res.status(200).json(growers);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   GET api/growers/:email
 * @desc    Get farmer growers
 * @access  Public
 */

router.get('/:email', async (req, res) => {
  try {
    var query = { chossenfarmer: req.params.email };
    const growers = await Grower.find(query);
    if (!growers) throw Error('No growers');

    res.status(200).json(growers);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   POST api/growers
 * @desc    Create An grower
 * @access  Private
 */

router.post('/', async (req, res) => {

  const newgrower = new Grower({
    name: req.body.name,
    familyname: req.body.familyname,
    phone: req.body.phone,
    email: req.body.email,
    sizearea: req.body.sizearea,
    address: req.body.address,
    imageurl: req.body.imageurl,
    choosenvegetables: req.body.choosenvegetables,
    plan: req.body.plan,
    chossenfarmer: req.body.chossenfarmer,
    chossenfarmerfullname: req.body.chossenfarmerfullname,
    totalpayment: req.body.totalpayment,
    isactive: req.body.isactive
  });

  try {
    Grower.findOne({ email: req.body.email }).then(grower => {if(grower) throw Error('Grower already exists')});

    const grower = await newgrower.save();
    if (!grower) throw Error('Something went wrong saving the grower');

    res.status(200).json(grower);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
  
});

/**
 * @route   DELETE api/growers/:id
 * @desc    Delete A grower
 * @access  Private
 */

router.delete('/:id', async (req, res) => {
  try {
    const grower = await Grower.findById(req.params.id);
    if (!grower) throw Error('No farmer found');

    const removed = await grower.remove();
    if (!removed)
      throw Error('Something went wrong while trying to delete the farmer');

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

module.exports = router;