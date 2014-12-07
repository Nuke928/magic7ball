var currentAnswer = null;

function answer_appear(obj, displayShareButtons) {
  $('#answer-content').html('says: ' + obj.answer);
  
  if(displayShareButtons) {
    $('#share-btn-twitter iframe').remove();
    var tweetBtn = $('<a></a>')
        .addClass('twitter-share-button')
        .attr('href', 'http://twitter.com/share')
        .attr('data-hashtags', '7ball')
        .attr('data-text', obj.question + ' - ' + obj.answer);
    $('#share-btn-twitter').append(tweetBtn);
    $('#share-btn-twitter').css({'display': 'block'});
    twttr.widgets.load();
  } else {
    $('#share-btn-twitter').css({'display': 'none'});
  }
  
  $('#metadata').html(obj.askcount + ' people have asked this question.');
  
  $('#answer').css({'display': 'block'});
  $('#answer').hide().fadeIn(3000);
}

String.prototype.endsWith = function(pattern) {
    var d = this.length - pattern.length;
    return d >= 0 && this.lastIndexOf(pattern) === d;
};

function btn_ask_click() {
  var q = document.getElementById('askbox').value;
  if(currentAnswer && currentAnswer.question  + '?' == q) {
    //return;
  }
  
  if(!q.endsWith('?')) {
    answer_appear({ answer: "Please ask me a question!!" }, false);
    return;
  }
  
  if(q) {
    $.get('/api/ask/' + q, function(result) {
      obj = JSON.parse(result);
      currentAnswer = obj;
      answer_appear(obj, true);
    });
  }
}