const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const VeglogSchema = new Schema({
    farmername: {
        type: String,
        required: true
    },
    farmeremail: {
        type: String,
        required: true
    },
    vegetablesafterchange: [
        {
            _id: { type: String },
            name: { type: String },
            pricebefore: { type: String },
            priceafter: { type: String }
        }
    ],
    log_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Veglog = mongoose.model('veglog', VeglogSchema);