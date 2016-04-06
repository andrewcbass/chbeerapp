var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var request = require('request');

var User = require('../models/user');

router.get("/randomBeer", User.authMiddleware,function(req, res) {
  var triedBeers = req.user.beers;

  request("http://api.brewerydb.com/v2/beer/random?key=3cc2b26fe7c06a97045e12b33c5abcf6", function(err, response, body) {
    var newBeer = (JSON.parse(body).data);
    console.log('NEWBEER', newBeer);
    res.status(err ? 400 : 200).send(err || body);
  });
});


router.get('/', function(req, res) {
  User.find({}, function(err, users) {
    res.status(err ? 400 : 200).send(err || users);
  });
});

router.delete('/logout', function(req, res) {
  res.clearCookie('authtoken').send();
});


router.post('/authenticate', function(req, res) {
  User.authenticate(req.body, function(err, user) {
    if(err) {
      res.status(400).send(err);
    } else {
      var token = user.generateToken();
      res.cookie('authtoken', token).send(user);
    }
  });
});

router.post('/register', function(req, res) {
  User.register(req.body, function(err, user) {
    if(err) {
      res.status(400).send(err);
    } else {
      var token = user.generateToken();
      res.cookie('authtoken', token).send(user);
    }
  });
});



module.exports = router;
