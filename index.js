"use-strict"
let express = require('express')
let app = express()
let OAuth = require('oauth')
let http = require('http')
let bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))

let myoauth = new OAuth.OAuth(
  	"https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    "nnokV2lzBmdm8IaKTnB9wpZex",
    "war9jmdR2cqdIXD3UiqIgoDs8PUj06cOMINKBIHr1ZEzYeLzqU",
    '1.0A',
    null,
    'HMAC-SHA1'
)

app.set('port', process.env.PORT || 3000)
app.set('view-engine', 'ejs')
app.get('/', function(req,res,next){
  res.render('result.ejs', {data: null})
})

app.post('/test', function(req,res,next){
  // res.send('test')
  myoauth.get(
    `https://api.twitter.com/1.1/search/tweets.json?count=10&q=${req.body.q}`,
    "780590703545946112-lXrMYSlTMCK4AlthI3svYpfPEqp3GwK",
    "pN3eSlhILnZKw4i29ROWYQBqmSyWpfOi5ycxUX8zpLrRY",
    function(e,data,rs){
      if(e){
        console.error(e)
      } else {
        let result = JSON.parse(data)
        res.render('result.ejs', {data: result})
      }
    }
  )
})

app.listen(app.get('port'), function(){
  console.log('listening on port', app.get('port'))
})
