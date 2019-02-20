$(document).ready(function() {

  $('#new-tweet-textarea').on('input', function() {
  let newVal = 140 - $(this).val().length;
  $(this).siblings('.counter').text(newVal);

  if(Number($(this).siblings('.counter').text()) < 0) {
    $(this).siblings('.counter').css('color', 'red');
  }
  else {
    $(this).siblings('.counter').css('color', '');
  }
  });

  $('#new-tweet-form').on('submit', function(event) {
    event.preventDefault();
    if ($('.counter').text() >= 0) {
      $('#new-tweet-textarea').val('');
      $(this).children('.counter').text('140').css('color', '');
    }
  });


})