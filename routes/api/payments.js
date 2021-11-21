const { json } = require('express');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const SendMail = require('../../Services/mail');

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
    // Mail to farmer when he join's
    var ReqBody1 = req.query;

    var reqOptions1 = {
        from: process.env.Email_User,
        to: 'Liron@projects.org.il',
        subject: '🌻 debug2 🌻',
        html: ReqBody1
    };

    try {
        SendMail(reqOptions1);
    } catch (e) {

    }

    const NewPaymentlog = new Paymentlog({
        userrole: req.query.pdesc,
        useremail: req.query.email,
        farmertopay: req.query.contact,
        phone: req.query.phone,
        sumpayed: req.query.sum,
        cardtype: req.query.cardtype,
        currency: req.query.currency
    });

    try {
        const Paymentlog = await NewPaymentlog.save();
        if (!Paymentlog) throw Error('תקלה בעת שמירת הלוג');

        res.status(200).redirect('http://greenhouse.com.s3-website-eu-west-1.amazonaws.com/PaymentSuccessPage');
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

/**
 * @route   GET api/payments
 * @desc    Get All Paymentlogs
 * @access  Public
 */

router.get('/:url', async (req, res) => {
    function parse_query_string(query) {
        var vars = query.split("&");
        var query_string = {};
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            var key = decodeURIComponent(pair[0]);
            var value = decodeURIComponent(pair[1]);
            // If first entry with this name
            if (typeof query_string[key] === "undefined") {
                query_string[key] = decodeURIComponent(value);
                // If second entry with this name
            } else if (typeof query_string[key] === "string") {
                var arr = [query_string[key], decodeURIComponent(value)];
                query_string[key] = arr;
                // If third or later entry with this name
            } else {
                query_string[key].push(decodeURIComponent(value));
            }
        }
        return query_string;
    }

    var search = req.params.url;
    var UrlParams = parse_query_string(search);

    // Mail to farmer when he join's
    var ReqBody1 = UrlParams;

    var reqOptions1 = {
        from: process.env.Email_User,
        to: 'Liron@projects.org.il',
        subject: '🌻 debug1 🌻',
        html: ReqBody1
    };

    try {
        SendMail(reqOptions1);
    } catch (e) {

    }

    const NewPaymentlog = new Paymentlog({
        userrole: UrlParams["pdesc"],
        useremail: UrlParams["email"],
        farmertopay: UrlParams["contact"],
        phone: UrlParams["phone"],
        sumpayed: UrlParams["sum"],
        cardtype: UrlParams["cardtype"],
        currency: UrlParams["currency"]
    });

    try {

        const Paymentlog = await NewPaymentlog.save();
        if (!Paymentlog) throw Error('תקלה בעת שמירת הלוג');

        res.status(200).redirect('http://greenhouse.com.s3-website-eu-west-1.amazonaws.com/PaymentSuccessPage');
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
    const NewPaymentlog = new Paymentlog({
        userrole: req.body.userrole,
        useremail: req.body.useremail,
        farmertopay: req.body.farmertopay,
        phone: req.body.phone,
        sumpayed: req.body.sumpayed,
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