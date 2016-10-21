var mongoose = require('mongoose');

module.exports = mongoose.model('course', {
  title: String,
  name: String,
  type: String
});