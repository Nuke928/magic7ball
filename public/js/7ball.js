var lastQuestion = null;

function answer_appear(obj, displayShareButtons) {
  $('#answer-content').html('<b>' + obj.answer + '</b>');
  
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
  
  if(obj.askcount) {
    $('#metadata').html(obj.askcount + ' people have asked this question.');
  }

  $('#answer').css({'display': 'block'});
  $('#answer').hide().fadeIn(3000);
}

String.prototype.endsWith = function(pattern) {
    var d = this.length - pattern.length;
    return d >= 0 && this.lastIndexOf(pattern) === d;
};

function btn_ask_click() {
  var q = document.getElementById('askbox').value;

  if(lastQuestion == q) {
    return;
  }
  
  if(!q.endsWith('?')) {
    answer_appear({ answer: "Please ask me a question!!" }, false);
    return;
  }
  
  if(q) {
    $.ajax({
      type: 'POST',
      url: '/api/ask',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify({q: q}),
      success: function(response) {
        var obj = JSON.parse(response);
        if(obj.error) {
          alert(obj.error);
          return;
        }
        lastQuestion = obj.question;
        answer_appear(obj, true);
      }
    });
  }
}