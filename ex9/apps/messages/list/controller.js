App.module('MessagesApp.List', function(List, App, Backbone, Marionette, $, _) {
    'use strict';

    List.Controller = {
        listMessages: function() {
            var messages = App.request('messages:list');

            var messageListView = new List.MessageListView({
                collection: messages
            });

            App.getRegion('main').show(messageListView);
        }
    };
});
