const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const GrowerSchema = new Schema({
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
  address: {
    type: String
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
  plan: 
    {
         name: {type : String},
         cost: {type : String}
    }, 
  chossenfarmer: {
      type : String
  },
  chossenfarmerfullname: {
    type : String
  },
  totalpayment: {
    type : String
  },
  isactive: {
    type : Boolean
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Grower = mongoose.model('grower', GrowerSchema);