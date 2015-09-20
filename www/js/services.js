angular.module('starter.services', [])
  .factory('Conversation', function($http) {

    var conversationID;
    var clientID;

    function createConversation(text) {
      var payload = {
        input: text
      };

      if (conversationID) {
        payload.conversation_id = conversationID;
        payload.client_id = clientID;
      }

      var req ={
        method: 'POST',
        url: 'http://c6faf276.ngrok.io/conversation',
        data: payload
      };

      function onConversationSuccess(resp) {
        var dialog = resp.data;
        conversationID = dialog.conversation.conversation_id;
        clientID = dialog.conversation.client_id;
        return dialog;
      }

      function onConversationFail(err) {
        console.error(err);
        return err;
      }

      return $http(req)
        .then(onConversationSuccess)
        .catch(onConversationFail);
    }

    function TwilioPhoneService(msg) {
      var req = {
        method: 'POST',
        url: 'http://e50e374a.ngrok.io/click2call',
        data: {
          phoneNumber: '6502743517'
        }
      };

      function onTwilioPhoneServiceSuccess(resp) {
        return resp.data;
      }

      function onTwilioPhoneServiceFail(err) {
        console.error('Fail Twilio Phone Service', err);
        return err;
      }

      return $http(req)
        .then(onTwilioPhoneServiceSuccess)
        .catch(onTwilioPhoneServiceFail);
    }

    function getDiagnose() {
      var req = {
        method: 'GET',
        url: 'http://c6faf276.ngrok.io/diagnosis'
      };

      function onDiagnoseSuccess(resp) {
        return resp.data;
      }

      function onDiagnoseFail(err) {
        console.log('Fail to get diagnose', err);
        return err;
      }

      return $http(req)
        .then(onDiagnoseSuccess)
        .catch(onDiagnoseFail);
    }

    return {
      create: createConversation,
      makePhoneCall: TwilioPhoneService,
      getDiagnosis: getDiagnose
    };
  });
