'use strict';

var app = angular.module('testApp');

app.controller('navbarCtrl', function($scope, UserService, AuthService) {
  $scope.logout = function() {
    AuthService.logout();
  };

  $scope.$watch(function() {
    return UserService.username;
  }, function(username) {
    $scope.username = username;
  });
});

app.controller('authCtrl', function($scope, $state, AuthService) {
$scope.state = $state.current.name;
$scope.submit = function(user) {
  if ($scope.state === 'register') {
    // submit register form
    if (user.password !== user.password2) {
      $scope.user.password = $scope.user.password2 = '';
      alert('HEY. Passwords gotta match!');
    } else {
      AuthService.register(user)
        .then(function() {
          $state.go('home');
        }, function(err) {
          console.error(err);
        });
    }
  } else {
    // submit login form
    AuthService.login(user)
      .then(function() {
        $state.go('home');
      }, function(err) {
        console.error(err);
      });
  }
};
});

app.controller("profileCtrl", function($scope, $state, UserService) {
  $scope.username =  UserService.username;
  $scope.email =  UserService.email;
  $scope.beers =  UserService.beers;

});

app.controller("beerCtrl", function($scope, $state, UserService, BeerService) {
  BeerService.getBeer();

  $scope.newBeer = function() {
    BeerService.getBeer();
  }


});
