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
        url: 'http://localhost:3000/conversation',
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

    return {
      create: createConversation
    };
  });
