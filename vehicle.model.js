/* eslint-disable no-undef */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


Vehicle = new Schema({
    vName: {
        type: String
    },
    vType: {
        type: String
    },
    vprice: {
        type: String
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    cNumber: {
        type: String
    }
 },
  {
    collation: 'vehicle'
});

module.exports = mongoose.model('Vehicle',Vehicle);