angular.module('starter.controllers', [])
  .controller('PageCtrl', function($scope, $ionicFrostedDelegate, $ionicScrollDelegate, $rootScope, Conversation, $sce) {
    var patientMessages = [
      {content: 'I have a headache, vomiting, dizziness '},
      {content: 'Beta Blockers'},
      {content: 'None'}
    ];

    var messageIter = 0;
    $scope.messages = [];

    Conversation.create('').then(function handleDialog(dialog) {
      var texts = dialog.conversation.response.join('<br/>');
      console.log(texts);
      $scope.messages.push(angular.extend({}, {content: '<p>'+texts+'</p>'}));
    });

    $scope.add = function() {
      var nextMessage = patientMessages[messageIter++];
      $scope.messages.push(angular.extend({}, {content: '<p>'+nextMessage.content+'</p>'}));
      Conversation.create(nextMessage.content).then(function handleDialog(dialog) {
        var texts = dialog.conversation.response.join('<br/>');
        console.log(texts);
        $scope.messages.push(angular.extend({}, {content: '<p>'+texts+'</p>'}));
      });

      // Update the scroll area and tell the frosted glass to redraw itself
      $ionicFrostedDelegate.update();
      $ionicScrollDelegate.scrollBottom(true);
    };
  });
