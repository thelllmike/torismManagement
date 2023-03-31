/* eslint-disable no-undef */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


Customer = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    countryCode: {
        type: String
    },
    phoneNu: {
        type: String
    },
    nic: {
        type: String
    },
    address: {
        type: String
    },
    nationality: {
        type: String
    },
    country: {
        type: String
    },
    password: {
        type: String
    },
    cpassword: {
        type: String
    }
    ,
    vaccine: {
        type: String,
        enum:['yes','no']
    }
 
 },
  {
    collation: 'customer'
});

module.exports = mongoose.model('Customer',Customer);