"user strict"
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let modelUser = require('./models/index');
let routes = require('./routes/user.js')
let jwt = require('jsonwebtoken')
var model = require("./models/index")
let index = require('./routes/index.js')
var OAuth = require('oauth');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('/', function(req, res, next) {
    res.json({
        message: "HelloW!"
    })

});

app.use('/api', function(req, res, next) {
    if (req.body.token != null) {
        jwt.verify(req.body.token, 'apaajahyeah', function(err, decoded) {
            if (err) {
                res.json({
                    success: false,
                    message: 'Failed to authenticate token'
                })
            } else {
                req.decoded = decoded
                res.send(req.decoded)
            }
        })
    } else {
        res.json({
            success: false,
            message: 'No token provided'
        })
    }
})

app.use('/api', routes)

app.use('/', index)

var access_token = "154606959-CkzjYmJ93H9GxDsTWDaPFfcw2RzBPgW44sbK1VwX"
var token_secret = "PJItyyTeBgig31k5802KFmNbtoUvtx16WS6SwwtozQ2F8"
var consumer_key = "zUjbQkhlFDuItROxO7PAxmtoa"
var consumer_secret = "cdBJmWIzgOHOmKbqpU7TaDLMGSRNmYSsJQrKdJOlHkq7Rn2YFh"


//
// app.get('/sessions/connect', function(req, res) {
//     consumer.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results) {
//         if (error) {
//             res.send("Error getting OAuth request token : " + util.inspect(error), 500);
//         } else {
//             req.session.oauthRequestToken = oauthToken;
//             req.session.oauthRequestTokenSecret = oauthTokenSecret;
//             res.redirect("https://twitter.com/oauth/authorize?oauth_token=" + req.session.oauthRequestToken);
//         }
//     });
// });


app.get("/testoauth", function(req, res, next) {
    var oauth = new OAuth.OAuth(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        consumer_key,
        consumer_secret,
        '1.0A',
        null,
        'HMAC-SHA1'
    );
    oauth.get(
        'https://api.twitter.com/1.1/trends/place.json?id=23424977',
        access_token, //test user token
        token_secret, //test user secret
        function(e, data, response) {
            if (e) console.error(e);
            console.log(require('util').inspect(data));
            res.json(JSON.parse(data.trends.name))
        })
});




app.post("/authenticate", function(req, res, next) {
    model.User.findAll({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    }).then(function(result) {
        console.log(result);
        if (result.length >= 1) {
            var token = jwt.sign({
                username: req.body.username
            }, 'apaajahyeah')
            res.json(token)
        }
    })
});

app.listen(3000, function() {
    console.log('example app listenings port 4000!');

})
