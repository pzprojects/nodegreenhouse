const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SystemSchema = new Schema({
  hamamadefaultsize: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = System = mongoose.model('system', SystemSchema);