'use strict';

var App = new Marionette.Application();

App.addRegions({
    menu: 'div[data-region="menu"]',
    main: 'div[data-region="main"]'
});

App.on('start', function() {
    /**
     * Als de app is gestart, starten we Backbone.history zodat de routing
     * gaat werken
     */
    if (Backbone.history) {
        Backbone.history.start({
            pushState: true,
            root: '/ex9/'
        });
    }
});

/**
 * Wachten met het starten van de app tot de pagina geladen is.
 *
 * Als we App.start(); direct aanroepen zijn de routers van de sub-app nog niet
 * geinstantieerd en werken de routes niet.
 */
$(function() {
    App.start();
});
