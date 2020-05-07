const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MyshopitemSchema = new Schema({
  growername: {
    type: String,
    required: true
  },
  groweremail: {
    type: String,
    required: true
  },
  farmername: {
    type: String,
    required: true
  },
  farmeremail: {
    type: String,
    required: true
  },
  totalpayed: {
    type: String
  },
  growershoopinglist : [
    {
         ChoosenVegName: {type : String},
         ChoosenVegAmount: {type : String},
         ChoosenVegPrice: {type : String}
    }
  ],
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Myshopitem = mongoose.model('myshopitem', MyshopitemSchema);