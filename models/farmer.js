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
  numberofactivefarms: {
    type: String
  },
  aboutme: {
    type: String,
    required: false
  },
  imageurl: {
    type: String,
    required: false
  },
  choosenvegetables : [
    {
         _id: {type : String},
         name: {type : String},
         price: {type : String},
         averagecrop: {type : String},
         amount: {type : String},
         numberofveginrow: {type : String},
         moreinfolink: {type : String}
    }
  ], 
  plans : [
    {
         name: {type : String},
         cost: {type : String}
    }
  ], 
  address: {
    type: String
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Farmer = mongoose.model('farmer', FarmerSchema);