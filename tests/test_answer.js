var Answer = require('../models/answer')
var answer = require('../lib/answer');
var should = require('should');
var mocha = require('mocha');
var mongoose = require('mongoose');
var config = require('../config')
mongoose.connect(config.db.test);

describe('Answers', function() {
  before(function(done) {
    Answer.remove({}, function(err) {
      done();
    });
  });
  it('returns an answer', function(done) {
    q = 'Will I be the first man on Saturn?';
    answer.askQuestion(q, function(result) {
      result.question.should.equal(q);
      result.answer.should.be.ok;
      result.askcount.should.equal(1);
      done();
    });
  });
  it('should increase the ask count', function(done) {
    q = 'Will I be the first man on Saturn?';
    answer.askQuestion(q, function(result) {
      result.question.should.equal(q);
      result.answer.should.be.ok;
      result.askcount.should.equal(2);
      done();
    });    
  });
});