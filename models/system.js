const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SystemSchema = new Schema({
  hamamadefaultsize: {
    type: String,
    required: true
  },
  plan1name: {
    type: String,
    required: true
  },
  plan1cost: {
    type: String,
    required: true
  },
  plan2name: {
    type: String,
    required: true
  },
  plan2cost: {
    type: String,
    required: true
  },
  plan3name: {
    type: String,
    required: true
  },
  plan3cost: {
    type: String,
    required: true
  },
  fieldcropplanname: {
    type: String,
    required: true
  },
  fieldcropplancost: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = System = mongoose.model('system', SystemSchema);