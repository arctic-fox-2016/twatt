var express = require('express');
var router = express.Router();
var OAuth = require('oauth')
var http = require('http')

var twitter = require('twitter');
var config = {
  consumer_key: 'yp9ZgsUDL7PI9jOECDfUesaTC',
  consumer_secret: 'QaBFH5tLN3KMZoQWl4QLAc7X94nmWDInLhe1MyZOIukuLJvgqP',
  access_token_key: '3146961314-p27SsJ8JPuxnP9MyTozMrvQGv0fYyAxNkyM7chJ',
  access_token_secret: 'aAaRROSStNinlTQwac0PlzRolx7rB7bpLpPKfVY9usLbe'
};

var oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  config.consumer_key,
  config.consumer_secret,
  '1.0',
  null,
  'HMAC-SHA1',
  null
)

var getTweet = function(url, callback) {
  oauth.get(
    url,
    config.access_token_key, //test user token
    config.access_token_secret, //test user secret
    function (e, data, r){
      if (e) console.error(e);
      callback(JSON.parse(data))
    }
  )
}

router.post('/search', function(req, res, next) {

  // make a client
  var twitterClient = new twitter(config);
  var search = req.body.search

  // pass in the search string, an options object, and a callback
  var options = { count: 100 };
  var results = []

  var url = 'https://api.twitter.com/1.1/search/tweets.json?q=' + req.body.search

  getTweet(url, function(data) {
    console.log(data.statuses)
    res.render('results', {
      data: data
    })
  })
});

module.exports = router;
