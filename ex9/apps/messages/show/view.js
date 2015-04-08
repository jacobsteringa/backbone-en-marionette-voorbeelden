App.module('MessagesApp.Show', function(Show, App, Backbone, Marionette, $, _) {
    'use strict';

    Show.MessageDetailView = Marionette.ItemView.extend({
        className: 'message',

        template: '#message-detail-template',

        modelEvents: {
            'change': 'render'
        },

        events: {
            'click a[data-action="mark-as-read"]': 'onClickMarkAsRead',
        },

        onClickMarkAsRead: function(e) {
            this.model.set('read', true);
        }
    });
});
