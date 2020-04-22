const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// farmer Model
const Farmer = require('../../models/farmer');

/**
 * @route   GET api/farmers
 * @desc    Get All farmers
 * @access  Public
 */

router.get('/', async (req, res) => {
  try {
    const farmers = await Farmer.find();
    if (!farmers) throw Error('No farmers');

    res.status(200).json(farmers);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   GET api/farmers/:sizearea?/:plan?
 * @desc    Get farmers by sizearea and plan
 * @access  Public
 */

router.get('/:sizearea?/:plan?', async (req, res) => {
  try {
    var query = { sizearea: req.params.sizearea };
    var farmers = await Farmer.find(query);
    if(req.params.plan !== null && req.params.plan !== '' && req.params.plan !== undefined && req.params.plan !== "undefined"){
      farmers = await farmers.filter(farmerUser => farmerUser.plans.some(item => item.name === req.params.plan));
    }
    if (!farmers) throw Error('No farmers');

    res.status(200).json(farmers);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   POST api/farmers
 * @desc    Create An Farmer
 * @access  Private
 */

router.post('/', async (req, res) => {

  const newfarmer = new Farmer({
    name: req.body.name,
    familyname: req.body.familyname,
    phone: req.body.phone,
    email: req.body.email,
    sizearea: req.body.sizearea,
    hamamasize: req.body.hamamasize,
    numberofactivefarms: req.body.numberofactivefarms,
    aboutme: req.body.aboutme,
    imageurl: req.body.imageurl,
    choosenvegetables: req.body.choosenvegetables,
    plans: req.body.plans,
    address: req.body.address
  });

  try {
    const farmer = await newfarmer.save();
    if (!farmer) throw Error('Farmer went wrong saving the farmer');

    res.status(200).json(farmer);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
  
});

/**
 * @route   DELETE api/farmers/:id
 * @desc    Delete A farmer
 * @access  Private
 */

router.delete('/:id', async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.params.id);
    if (!farmer) throw Error('No farmer found');

    const removed = await farmer.remove();
    if (!removed)
      throw Error('Something went wrong while trying to delete the farmer');

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

module.exports = router;