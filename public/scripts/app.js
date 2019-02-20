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
      <p>${tweet.content.text}</p>
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
  $.get('/tweets', (tweets) =>{
    renderTweets(tweets.reverse());
    });
}

//End of Functions---------------------------
loadTweets();

//New Tweet Render with ajax post
$('#new-tweet-form').submit((event)=> {
  event.preventDefault();
  const newContent = $('#new-tweet-form').serialize().replace('text=','').replace('+',' ');
  if (newContent > 140) {
    alert('Character limit exceeded');
  }
  else {
    $.post('/tweets',newContent)
    .then((req, res) => { 
      //renderTweets(newTweet);
    });
  }
});

});