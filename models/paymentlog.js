const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const paymentlogSchema = new Schema({
    userrole: {
        type: String,
        required: true
    },
    useremail: {
        type: String,
        required: true
    },
    sumpayed: {
        type: Number,
        required: true
    },
    credtype: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    log_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = paymentlog = mongoose.model('paymentlog', paymentlogSchema);