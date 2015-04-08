App.module('ContactsApp', function(ContactsApp, App, Backbone, Marionette, $, _) {
    'use strict';

    /**
     * Router voor deze sub-applicatie definieren
     */
    var Router = Marionette.AppRouter.extend({
        appRoutes: {
            'contacts': 'contactList'
        }
    });

    /**
     * 'Controller' object voor de Router
     */
    var API = {
        contactList: function() {
            ContactsApp.List.Controller.listContacts();
        }
    };

    /**
     * Events voor de routes
     */
    App.vent.on('contacts:list', function() {
        Backbone.history.navigate('contacts');
        API.contactList();
    });

    /**
     * Dit wordt uitgevoerd als de applicatie start
     */
    ContactsApp.on('start', function() {
        /**
         * Router instantieren met de controller als argument
         */
        new Router({
            controller: API
        });

        /**
         * Registreer menu item voor deze app
         */
        App.execute('addmenuitem', {
            name: 'Contacten',
            event: 'contacts:list'
        });
    });
});
