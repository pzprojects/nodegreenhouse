const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
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
  password: {
    type: String,
    required: true
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
  choosenvegetables : [
    {
         _id: {type : String},
         name: {type : String},
         price: {type : String},
         averagecrop: {type : String},
         amount: {type : String}
    }
  ], 
  plans : [
    {
         name: {type : String},
         cost: {type : String}
    }
  ],
  usertype: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('user', UserSchema);