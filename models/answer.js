var mongoose = require('mongoose');

var answerSchema = mongoose.Schema({
  question: {
    type: String,
    unique: true },
  answer: String,
  askcount: Number
});

module.exports = mongoose.model('Answer', answerSchema);