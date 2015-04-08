App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    'use strict';

    /**
     * Model en Collection definieren
     */
    var Message = Backbone.Model.extend({
        defaults: {
            email: '',
            firstName: '',
            lastName: ''
        }
    });

    var MessageCollection = Backbone.Collection.extend({
        model: Message
    });

    /**
     * Nieuwe collectie met dummy data instantieren
     */
    var messages = new MessageCollection([{
        id: 1,
        from: 'kees@kachel.nl',
        subject: 'Hold on to your butts',
        date: '08-04-2015',
        read: false,
        body: '<p>Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that\'s what you see at a toy store. And you must think you\'re in a toy store, because you\'re here shopping for an infant named Jeb. </p>'
    }, {
        id: 2,
        from: 'jan@jansen.nl',
        subject: 'Uuummmm, this is a tasty burger!',
        date: '07-04-2015',
        read: false,
        body: '<p>Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that\'s what you see at a toy store. And you must think you\'re in a toy store, because you\'re here shopping for an infant named Jeb. </p>'
    }, {
        id: 3,
        from: 'willy@wartaal.nl',
        subject: 'I\'m serious as a heart attack',
        date: '03-04-2015',
        read: false,
        body: '<p>Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that\'s what you see at a toy store. And you must think you\'re in a toy store, because you\'re here shopping for an infant named Jeb. </p>'
    }, {
        id: 4,
        from: 'kees@kachel.nl',
        subject: 'No, motherfucker',
        date: '02-04-2015',
        read: true,
        body: '<p>Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that\'s what you see at a toy store. And you must think you\'re in a toy store, because you\'re here shopping for an infant named Jeb. </p>'
    }]);

    /**
     * ReqRes handler om de collectie met contacten vanuit andere modules
     * op te halen.
     */
    App.reqres.setHandler('messages:list', function() {
        return messages;
    });

    /**
     * ReqRes handler om een Message Model op te halen aan de hand van het ID
     */
    App.reqres.setHandler('messages:entity', function(id) {
        return messages.findWhere({
            id: parseInt(id)
        });
    });
});
