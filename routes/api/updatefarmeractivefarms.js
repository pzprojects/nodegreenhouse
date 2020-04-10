const express = require('express');
const router = express.Router();

// farmer Model
const Farmer = require('../../models/farmer');

/**
 * @route   POST api/updatefarmeractivefarms
 * @desc    Update An updatefarmeractivefarms
 * @access  public
 */

router.post('/:email', (req, res) => {
    const { numberofactivefarms } = req.body;
  
    Farmer.findOne({email: req.params.email}, function (err, farmer) {
  
      try {
  
        if (!farmer) throw Error('No farmer found');
  
        // validate 
        if (!numberofactivefarms) throw Error('One or more fields are empty');
  
        // no need for else since you are returning early ^
        farmer.numberofactivefarms = numberofactivefarms;
  
        farmer.save();
        if (!farmer) throw Error('Something went wrong saving the farmer');
    
        res.status(200).json(farmer);
      } catch (e) {
        res.status(400).json({ msg: e.message });
      }
    });
});

module.exports = router;
