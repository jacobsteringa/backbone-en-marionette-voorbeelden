App.module('MessagesApp.List', function(List, App, Backbone, Marionette, $, _) {
    'use strict';

    List.MessageItemView = Marionette.ItemView.extend({
        tagName: 'tr',

        template: '#message-item-template',

        modelEvents: {
            'change': 'render'
        },

        events: {
            'click': 'onClick',
            'click a[data-action="mark-as-read"]': 'onClickMarkAsRead',
        },

        onClick: function(e) {
            App.vent.trigger('messages:show', this.model.get('id'));
        },

        onClickMarkAsRead: function(e) {
            e.stopPropagation();

            this.model.set('read', true);
        }
    });

    List.MessageEmptyView = Marionette.ItemView.extend({
        tagName: 'tr',

        template: '#message-empty-template'
    });

    List.MessageListView = Marionette.CompositeView.extend({
        tagName: 'table',

        template: '#message-list-template',

        childView: List.MessageItemView,

        childViewContainer: 'tbody',

        emptyView: List.MessageEmptyView
    });
});
