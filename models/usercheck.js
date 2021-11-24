const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const usercheckSchema = new Schema({
  useravaliabile: {
    type: Boolean,
    required: true
  }
});

module.exports = usercheck = mongoose.model('usercheck', usercheckSchema);