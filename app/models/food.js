var mongoose = require('mongoose');

module.exports = mongoose.model('food', {
  food: String,
  user: String,
  course: String
});