'use strict';

var app = angular.module('testApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', { url: '/', templateUrl: '/html/home.html' })
    .state('login',    { url: '/login',    templateUrl: '/html/auth.html', controller: 'authCtrl' })
    .state('register', { url: '/register', templateUrl: '/html/auth.html', controller: 'authCtrl' })
    .state('profile',
      { url: '/profile',
      templateUrl: '/html/profile.html',
      controller: 'profileCtrl',
      onEnter: stateProtection
    })
    .state('beer',
      { url: '/beer',
      templateUrl: '/html/beer.html',
      controller: 'beerCtrl',
      onEnter: stateProtection
    })
  $urlRouterProvider.otherwise('/');
});


function stateProtection(UserService, $state) {
    if(!UserService.username) {
      $state.go("home");
    }
  };

app.run(function(AuthService) {
  AuthService.init();
});
