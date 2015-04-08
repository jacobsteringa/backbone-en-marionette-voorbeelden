App.module('MessagesApp.Show', function(Show, App, Backbone, Marionette, $, _) {
    'use strict';

    Show.Controller = {
        showMessage: function(id) {
            var message = App.request('messages:entity', id);

            var messageDetailView = new Show.MessageDetailView({
                model: message
            });

            App.getRegion('main').show(messageDetailView);
        }
    };
});
