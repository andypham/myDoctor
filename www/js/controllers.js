angular.module('starter.controllers', [])
  .controller('PageCtrl', function($scope, $ionicFrostedDelegate, $ionicScrollDelegate, $rootScope, Conversation) {
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

    $scope.add = function(event) {
      var el = event.target;
      var message = el.value;
      el.value = '';
      var nextMessage = patientMessages[messageIter++];
      $scope.messages.push(angular.extend({}, {content: '<p>'+message+'</p>'}));
      Conversation.create(message).then(function handleDialog(dialog) {
        var texts = dialog.conversation.response.join('<br/>');
        console.log(texts);
        $scope.messages.push(angular.extend({}, {content: '<p>'+texts+'</p>'}));
        if (texts.indexOf('diagnosis') > -1) {
          Conversation.getDiagnosis().then(function handleDiagnose(diagnose) {
            $scope.messages.push(angular.extend({}, {content: '<p class="hidden">'+diagnose.name+'</p>'}));
            $scope.messages.push(angular.extend({}, {content: '<p>Looks like you show symptoms of '+diagnose.name+'</p>'}));
            $scope.messages.push(angular.extend({}, {content: '<p class="hidden"></p>'}));
            $scope.messages.push(angular.extend({}, {content: '<p>Let me get Dr. Pepper on the call to further assist you.</p>'}));
            Conversation.makePhoneCall().then(function handlePhoneCall(data) {
              console.log(data);
            });
          });
        }
      });

      // Update the scroll area and tell the frosted glass to redraw itself
      $ionicFrostedDelegate.update();
      $ionicScrollDelegate.scrollBottom(true);
    };
  });
