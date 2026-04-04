const mongoose = require('mongoose');

const relationshipSchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model('Relationship', relationshipSchema);