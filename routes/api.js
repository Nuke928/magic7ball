var express = require('express');
var router = express.Router();
var answer = require('../lib/answer');

router.post('/ask', function(req, res) {
  var q = req.body.q;
  if(!q) {
    res.end(JSON.stringify({
      error: 'No question marked!'
    }));
    return;
  }
  answer.askQuestion(q, function(result) {
    res.end(JSON.stringify(result));
  });
});

module.exports = router;
