/* eslint-disable no-undef */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


Ayurveda = new Schema({
    firstName: {
        type: String
    },
    age: {
        type: String
    },
    country: {
        type: String
    },
    state: {
        type: String
    }
    ,
    gender: {
        type: String,
        enum:['male','female']
    }
 
 },
  {
    collation: 'ayurveda'
});

module.exports = mongoose.model('Ayurveda',Ayurveda);