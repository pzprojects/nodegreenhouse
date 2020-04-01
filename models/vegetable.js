const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const vegetableSchema = new Schema({
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
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = vegetable = mongoose.model('vegetable', vegetableSchema);