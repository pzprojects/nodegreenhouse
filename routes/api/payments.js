const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// farmer Paymentlog
const Paymentlog = require('../../models/paymentlog');

const FindPaymentRecord = (query) => {
    return new Promise((resolve) => {
        setTimeout(async () => {
            const Paymentlogs = await Paymentlog.find(query);
            if (Paymentlogs.length > 0) {
                resolve(true);
            } else {
                resolve(false);
            }
        }, 2000);
    });
}

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
        let Paymentlogs = [];
        let haveFound = false;
        //userrole: req.params.role
        // 15 minutes ago (from now)
        var query = { $and: [{ useremail: req.params.email, userrole: req.params.role, log_date: { $gt: new Date(Date.now() - 1000 * 60 * 15) } }] };
        for (i = 0; i < 150; i++) {
            haveFound = await FindPaymentRecord(query);
            if (haveFound) {
                Paymentlogs = await Paymentlog.find(query);
                break;
            }
        }

        if (!Paymentlogs) throw Error('No payments found');
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

router.post('/', async (req, res) => {
    console.log('here');
    console.log(req);
    const NewPaymentlog = new Paymentlog({
        userrole: req.body.pdesc,
        useremail: req.body.email,
        farmertopay: req.body.contact,
        phone: req.body.phone,
        sumpayed: req.body.sum,
        cardtype: req.body.cardtype,
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