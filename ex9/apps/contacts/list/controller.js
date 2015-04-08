App.module('ContactsApp.List', function(List, App, Backbone, Marionette, $, _) {
    'use strict';

    List.Controller = {
        listContacts: function() {
            var contacts = App.request('contacts:list');

            var contactListView = new List.ContactListView({
                collection: contacts
            });

            App.getRegion('main').show(contactListView);
        }
    };
});
