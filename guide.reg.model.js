/* eslint-disable no-undef */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


Guide = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    age: {
        type: String
    },
    phoneNu: {
        type: String
    },
    Image: {
        type: String
    }
 },
  {
    collation: 'guide'
});

module.exports = mongoose.model('Guide',Guide);