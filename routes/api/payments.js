const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// farmer Paymentlog
const Paymentlog = require('../../models/paymentlog');

/**
 * @route   GET api/payments
 * @desc    Get All Paymentlogs
 * @access  Public
 */

router.get('/', async (req, res) => {
    try {
        const Paymentlogs = await Paymentlog.find();
        if (!Paymentlogs) throw Error('לא נמצאו נתונים');

        res.status(200).json(Paymentlogs);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

/**
 * @route   GET api/payments/:role/:email
 * @desc    Get User Payment Validation
 * @access  Public
 */

 router.get('/:role?/:email?', async (req, res) => {
    try {
      var query = { useremail: req.params.email, userrole: req.params.role };
      const Paymentlogs = await Paymentlog.find(query);
      if (!Paymentlogs) throw Error('No growers');
  
      res.status(200).json(Paymentlogs);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });

/**
 * @route   POST api/payments
 * @desc    Create An Paymentlog
 * @access  Private
 */

router.post('/', auth, async (req, res) => {
    const NewPaymentlog = new Paymentlog({
        userrole: req.body.userrole,
        useremail: req.body.useremail,
        sumpayed: req.body.sumpayed,
        credtype: req.body.credtype,
        currency: req.body.currency
    });

    try {
        const Paymentlog = await NewPaymentlog.save();
        if (!Paymentlog) throw Error('תקלה בעת שמירת הלוג');

        res.status(200).json(Paymentlog);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

/**
 * @route   DELETE api/payments/:id
 * @desc    Delete A Paymentlog
 * @access  Private
 */

router.delete('/:id', auth, async (req, res) => {
    try {
        const Paymentlogtodelete = await Paymentlog.findById(req.params.id);
        if (!Paymentlogtodelete) throw Error('הלוג לא קיים');

        const removed = await Paymentlogtodelete.remove();
        if (!removed)
            throw Error('תקלה בעת מחיקת הלוג');

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ msg: e.message, success: false });
    }
});

module.exports = router;