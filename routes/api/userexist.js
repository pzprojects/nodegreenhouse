const express = require('express');
const router = express.Router();

// farmer Model
const Farmer = require('../../models/farmer');

// grower Model
const Grower = require('../../models/grower');

const Usercheck = require('../../models/usercheck');


/**
 * @route   GET api/userexist/:email
 * @desc    Check if user exist
 * @access  Public
 */

router.get('/:email', async (req, res) => {
    let UserExist = false;
    try {
        Farmer.findOne({ email: req.params.email }).then(farmer => {
            if (farmer) {
                UserExist = true;
            }
            if (!UserExist) {
                Grower.findOne({ email: req.params.email }).then(grower => {
                    if (grower) {
                        UserExist = true;
                    }
                    const NewUsercheck = new Usercheck({
                        useravaliabile: !UserExist
                    });
                    res.status(200).json(NewUsercheck);
                });
            } else {
                const NewUsercheck = new Usercheck({
                    useravaliabile: !UserExist
                });

                res.status(200).json(NewUsercheck);
            }
        });
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

module.exports = router;