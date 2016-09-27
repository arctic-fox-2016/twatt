var express = require('express');
var router = express.Router();
var http = require('http')
var oauth = require('oauth')
var twitConfig = require('../config.js')



/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {
		title: 'Twatt! :P',
		dataTwitter: ''
	});
});

router.post('/search', function (req, res, next) {

	myOauth = new oauth.OAuth(
		'https://api.twitter.com/oauth/request_token',
		'https://api.twitter.com/oauth/access_token',
		twitConfig.consumerKey,
		twitConfig.consumerSecret,
		'1.0A',
		null,
		'HMAC-SHA1'
	);

	myOauth.get(
		'https://api.twitter.com/1.1/search/tweets.json?q=' + req.body.searchQuery,
		twitConfig.accessToken,
		twitConfig.accessTokenSecret,
		function (err, data, rs) {
			if (err) console.error(err)
			console.log(require('util').inspect(data));
			var hasil = JSON.parse(data)
				//res.send(hasil.statuses)
			res.render('index', {
				title: 'Twatt!',
				dataTwitter: hasil.statuses
			})
		}
	)
})

module.exports = router;;
