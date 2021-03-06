'use strict';

var app = angular.module('testApp');

app.service('BeerService', function($http, $state, UserService) {
  this.getBeer = function() {
    return $http.get("/users/randomBeer")
  }
})

app.service('AuthService', function($http, $state, UserService) {
  this.register = function(user) {
    return $http.post('/users/register', user)
      .then(function(res) {
        UserService.set(res.data);
      });
  };

  this.login = function(user) {
    return $http.post('/users/authenticate', user)
      .then(function(res) {
        UserService.set(res.data);
      });
  };

  this.logout = function() {
    $http.delete('/users/logout')
    .then(function() {
      UserService.destroy();
      $state.go("home");
    });
  };

  this.init = function() {
    $http.get('/users/profile')
    .then(function(res) {
      UserService.set(res.data);
    });
  };
});


app.service('UserService', function() {
  this.set = function(user) {
    this.username = user.username;
    this._id = user._id;
    this.email = user.email;
    this.beers = user.beers;
  };
  this.destroy = function() {
    this.username = null;
    this._id = null;
  };
});
