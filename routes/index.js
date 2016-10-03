var express = require('express');
var router = express.Router();
var http = require('http')
var oauth = require('oauth')

var accessToken = '39072092-bKj1beTz6bHyrxlRb0xZivQJiDwCje5HObHFtskvn'
var accessTokenSecret = 'T5SPIgwyz9FJ3TKWGAGj3Dl8ydFCyhlRcrK8MAsKX61qF'
var consumerKey = 'Vt2ZJFztRrz2jKzjs5WQgGpK0'
var consumerSecret = 'h0xUPh70Dl6rup2bDwZPPhUAXO91dO4z9bPCmyPF4eFzp3M19y'


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
		consumerKey,
		consumerSecret,
		'1.0A',
		null,
		'HMAC-SHA1'
	);

	myOauth.get(
		'https://api.twitter.com/1.1/search/tweets.json?q=' + req.body.searchQuery,
		accessToken,
		accessTokenSecret,
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

module.exports = router;
