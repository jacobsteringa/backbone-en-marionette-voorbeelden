App.module('ContactsApp.List', function(List, App, Backbone, Marionette, $, _) {
    'use strict';

    List.ContactItemView = Marionette.ItemView.extend({
        tagName: 'tr',

        template: '#contact-item-template'
    });

    List.ContactEmptyView = Marionette.ItemView.extend({
        tagName: 'tr',

        template: '#contact-empty-template'
    });

    List.ContactListView = Marionette.CompositeView.extend({
        tagName: 'table',

        template: '#contact-list-template',

        childView: List.ContactItemView,

        childViewContainer: 'tbody',

        emptyView: List.ContactEmptyView
    });
});
