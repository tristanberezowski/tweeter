//Client-side JS logic

$(() => {

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
});