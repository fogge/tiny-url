const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const linkSchema = new Schema({
  webUrl: {
    type: String,
    required: true
  },
  tinyUrl: {
    type: String,
    required: true
  },
  session: {
    type: String,
    required: true
  },
  date: Date

});

module.exports = mongoose.model('Link', linkSchema);