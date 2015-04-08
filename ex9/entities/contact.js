App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    'use strict';

    /**
     * Model en Collection definieren
     */
    var Contact = Backbone.Model.extend({
        defaults: {
            email: '',
            firstName: '',
            lastName: ''
        }
    });

    var ContactCollection = Backbone.Collection.extend({
        model: Contact
    });

    /**
     * Nieuwe collectie met dummy data instantieren
     */
    var contacts = new ContactCollection([{
        id: 1,
        firstName: 'Jan',
        lastName: 'Jansen',
        email: 'jan@jansen.nl'
    }, {
        id: 2,
        firstName: 'Kees',
        lastName: 'Kachel',
        email: 'kees@kachel.nl'
    }, {
        id: 3,
        firstName: 'Pieter',
        lastName: 'Post',
        email: 'pieter@post.nl'
    }]);

    /**
     * ReqRes handler om de collectie met contacten vanuit andere modules
     * op te halen.
     */
    App.reqres.setHandler('contacts:list', function() {
        return contacts;
    });
});
