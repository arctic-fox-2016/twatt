var express = require('express')
var router = express.Router()
var model = require("../models/index")
var jwt = require('jsonwebtoken')


router.get('/test', function(req, res, next) {
    res.render('index');
});


module.exports = router;
