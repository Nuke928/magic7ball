var express = require('express');
var router = express.Router();
var answer = require('../lib/answer')

router.get('/ask/:q', function(req, res) {
  var q = req.params.q;
  answer.askQuestion(q, function(result) {
    res.end(JSON.stringify(result));
  });
});

module.exports = router;
