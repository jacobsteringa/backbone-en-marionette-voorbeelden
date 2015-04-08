App.module('MessagesApp', function(MessagesApp, App, Backbone, Marionette, $, _) {
    'use strict';

    /**
     * Router voor deze sub-applicatie definieren
     */
    var Router = Marionette.AppRouter.extend({
        appRoutes: {
            '': 'messageList',
            'messages/:id': 'messageDetail'
        }
    });

    /**
     * 'Controller' object voor de Router
     */
    var API = {
        messageList: function() {
            MessagesApp.List.Controller.listMessages();
        },

        messageDetail: function(id) {
            MessagesApp.Show.Controller.showMessage(id);
        }
    };

    /**
     * Events voor de routes
     */
    App.vent.on('messages:list', function() {
        Backbone.history.navigate('');
        API.messageList();
    });

    App.vent.on('messages:show', function(id) {
        Backbone.history.navigate('messages/' + id);
        API.messageDetail(id);
    });

    /**
     * Dit wordt uitgevoerd als de applicatie start
     */
    MessagesApp.on('start', function() {
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
            name: 'Berichten',
            event: 'messages:list'
        });
    });
});
