const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const fieldcropSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  averagecrop: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  numberofveginrow: {
    type: String
  },
  moreinfolink: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = fieldcrop = mongoose.model('fieldcrop', fieldcropSchema);