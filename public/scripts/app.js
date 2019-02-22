//Client-side JS logic
$(() => {
// Functions------------------
const createTweetElement = function(tweet) { //returns jquery object
  let tweetHtml = `
    <article class=tweet>
      <header>
        <img src="${tweet.user.avatars.small}">
        <h5>${tweet.user.name}</h5>
        <div>${tweet.user.handle}</div>
      </header>
      <p>${escape(tweet.content.text)}</p>
      <footer>
        <div>${dateSince(tweet.created_at)}</div>
      </footer>
    </article>
  `;
  let $tweetHtml = $(tweetHtml);
  return $tweetHtml;
}

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $tweet.prependTo('#tweet-feed');
  }
}

const loadTweets = function() {
  $.get('/tweets', (tweets) => {
    renderTweets(tweets);
  });
};

const loadTweet = function() {
  $.get('/tweets', (tweets) => {
    renderTweets([tweets[tweets.length - 1]]);
  });
};

const escape = function(text) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}

const dateSince = function(epoch) {
  let diff = Date.now() - epoch;
  console.log(diff / 3600000 / 60);
  if (diff / 31556926000 >= 1)
    return `${Math.floor(diff / 31556926000)} years ago`;
  if (diff / 2629743000 >= 1)
    return `${Math.floor(diff / 2629743000)} months ago`;
  if (diff / 604800000 >= 1)
    return `${Math.floor(diff / 604800000)} weeks ago`;
  if (diff / 86400000 >= 1)
    return `${Math.floor(diff / 86400000)} days ago`;
  if (diff / 3600000 >= 1)
    return `${Math.floor(diff / 3600000)} hours ago`;
  if (diff / 3600000 * 60 >= 1)
    return `${Math.floor(diff / 3600000 * 60)} minutes ago`;
  if (diff / 3600000 * 60 * 60 >= 1)
    return `${Math.floor(diff / 3600000 * 60 * 60)} seconds ago`;
  return 'Just now'
}

//End of Functions---------------------------
loadTweets();

//New Tweet Render with ajax post
$('#new-tweet-form').submit((event)=> {
  event.preventDefault();
  const newContent = $('#new-tweet-textarea').serialize();
  if (newContent.length - 5 > 140) {
    $('#new-tweet-error').text('Character limit exceeded').css('display', 'flex');
    setTimeout( () => { $('#new-tweet-error').css('display', 'none'); }, 2000);
  }
  else if(newContent.length === 5) {
    $('#new-tweet-error').text('Cannot create an empty tweet').css('display', 'flex');
    setTimeout( () => { $('#new-tweet-error').css('display', 'none'); }, 2000);
  }
  else {
    $.post('/tweets', newContent)
    .then((req, res) => {
      loadTweet();
    });
  }
});
//Compose button in nav bar on click effects
$('#compose-toggle').on('click', function(event) {
  if ( $('.new-tweet').css('display') === 'none') {
    $('.new-tweet').slideToggle(200, () => {
      $('#new-tweet-textarea').focus();
      $('#compose-toggle').css('filter', 'brightness(110%)');
  })}
  else {
    $('.new-tweet').slideToggle(200);
    $('#compose-toggle').css('filter', 'brightness(100%)');
  }
});
});