var answers = require('../answers');
var Answer = require('../models/answer');

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

function getAnswer() {
  return answers[randomInt(0, answers.length)];
}

exports.askQuestion = function(q, cb) {
  Answer.findOne({question: q}, function(err, obj) {
      // Increment ask count and update
    if(obj) {
      obj.askcount += 1;
      Answer.update({question: q}, obj, function(err, obj2) {
        cb(obj);
      });
    } else {
      // Save new answer
      var answer = new Answer({ question: q, answer: getAnswer(), askcount: 1 });
      answer.save(function(err, obj) {
        cb(obj);
    }); 
    }
  });
};