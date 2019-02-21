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
        <div>${Math.floor(tweet.created_at / 86400)} days ago</div>
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
    renderTweets(tweets.reverse());
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

//End of Functions---------------------------
loadTweets();

//New Tweet Render with ajax post
$('#new-tweet-form').submit((event)=> {
  event.preventDefault();
  const newContent = $('#new-tweet-textarea').serialize();
  if (newContent.length - 5 > 140) {
    alert('Character limit exceeded');
  }
  else if(newContent.length === 5) {
    alert('Nothing was entered');
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
  })}
  else {
    $('.new-tweet').slideToggle(200)
  }
});

});