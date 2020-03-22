const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const FarmerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  familyname: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  sizearea: {
    type: String,
    required: true
  },
  hamamasize: {
    type: String,
    required: true
  },
  aboutme: {
    type: String,
    required: false
  },
  imageurl: {
    type: String,
    required: false
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Farmer = mongoose.model('farmer', FarmerSchema);