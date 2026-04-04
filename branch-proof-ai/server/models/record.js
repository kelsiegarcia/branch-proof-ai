const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  title: String,
  description: String,
  person: String
});

module.exports = mongoose.model('Record', recordSchema);