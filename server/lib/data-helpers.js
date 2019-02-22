"use strict";

// Defines helper functions for saving and getting tweets, using the database mongo database 'tweets'
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      simulateDelay(() => {
        db.tweets.push(newTweet);
        callback(null, true);
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      return db.collection('find').find().toArray(callback);
    }
  }
}