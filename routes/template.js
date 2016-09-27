var express = require('express')
var router = express.Router()
var OAuth = require('oauth')
var http = require('http')
//var auth = require('./models/auth')

var myoauth = new OAuth.OAuth(
	"https://api.twitter.com/oauth/request_token",
  "https://api.twitter.com/oauth/access_token",
  "TWBI2C2gO18JAN9NjUsHtqEse",
  "fmkk87g8hYrnMN1odHFdbO31lFlUt9kNGLyrZ8BjhdKkXVswKu",
  '1.0A',
  null,
  'HMAC-SHA1'
)

router.get('/', function(req, res, next) {
  res.render('template/body', {
    title: 'Twatt App',
    search: null,
    tweet: null
  })
})

router.post('/', function(req, res, next){
  myoauth.get(
    `https://api.twitter.com/1.1/search/tweets.json?count=10&q=${req.body.search}`,
    "69251620-qw3N3dHKFXtWZ2qbY8thCBE0iyXNL2vtvqoTyYUtf",
    "jjxweAjAU0jBIXBs5OBF1jpJS0co2wqFeaBHhhzNtJupT",
    function(e, data, rs){
      if(e){
        console.error(e)
      } else {
        let result = JSON.parse(data)
        //res.render('result.ejs', {data: result})
        //res.json(result)
        res.render('template/body', {
          title: 'Twatt App',
          search: req.body.search,
          tweet: result.statuses
        })
      }
    }
  )
})

module.exports = router;
