/*
angular.module('starter', ['ionic', 'ionic.contrib.frostedGlass'])

  .controller('PageCtrl', function($scope, $ionicFrostedDelegate, $ionicScrollDelegate, $rootScope) {
    var messageOptions = [
      { content: '<p>Wow, this is really something huh?</p>' },
      { content: '<p>Yea, it\'s pretty sweet</p>' },
      { content: '<p>I think I like Ionic more than I like ice cream!</p>' },
      { content: '<p>Gee wiz, this is something special.</p>' },
      { content: '<p>Is this magic?</p>' },
      { content: '<p>Am I dreaming?</p>' },
      { content: '<p>Am I dreaming?</p>' },
      { content: '<p>Yea, it\'s pretty sweet</p>' },
      { content: '<p>I think I like Ionic more than I like ice cream!</p>' },
    ];

    var messageIter = 0;
    $scope.messages = messageOptions.slice(0, messageOptions.length);

    $scope.add = function() {
      var nextMessage = messageOptions[messageIter++ % messageOptions.length];
      $scope.messages.push(angular.extend({}, nextMessage));

      // Update the scroll area and tell the frosted glass to redraw itself
      $ionicFrostedDelegate.update();
      $ionicScrollDelegate.scrollBottom(true);
    };
  });
 */

// Ionic Starte r App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic',
                           'starter.controllers',
                           'starter.services',
                           'ionic.contrib.frostedGlass',
                           'ngSanitize'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
});
