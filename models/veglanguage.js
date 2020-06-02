const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const veglanguageSchema = new Schema({
  vegname: {
    type: String,
    required: true
  },
  langconvert : [
    {
         langname: {type : String},
         langvalue: {type : String},
    }
  ],
});

module.exports = Veglanguage = mongoose.model('veglanguage', veglanguageSchema);