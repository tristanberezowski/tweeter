$(document).ready(function() {
  /*
 Although criteria says that using this is better, in this case it is not since we
 are dealing with a unique item and change in styling upon learning flexbox broke
 this code when adding a new div wrap to properly flexbox the error notification.

 Adding more counter classes will break the new code but changing the class to an id is
 very fast anyways.

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
*/

$('#new-tweet-textarea').on('input', function() {
  let newVal = 140 - $(this).val().length;
  $('.counter').text(newVal);

  if(Number($('.counter').text()) < 0) {
    $('.counter').css('color', 'red');
  }
  else {
    $('.counter').css('color', '');
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