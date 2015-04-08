App.module('MenuApp', function(MenuApp, App, Backbone, Marionette, $, _) {
    'use strict';

    /**
     * Model en Collectie definieren
     */
    var MenuItem = Backbone.Model.extend({
        defaults: {
            name: '',
            event: ''
        }
    });

    var MenuItemCollection = Backbone.Collection.extend({
        model: MenuItem
    });

    /**
     * ItemView en CollectionView waarmee het menu zal worden gerendered
     * definieren
     */
    var MenuItemView = Marionette.ItemView.extend({
        tagName: 'li',

        template: '#menu-item-template',

        events: {
            'click a[data-action="navigate"]': 'onClickNavigate'
        },

        onClickNavigate: function(e) {
            App.vent.trigger(this.model.get('event'));
        }
    });

    var MenuListView = Marionette.CollectionView.extend({
        tagName: 'ul',

        childView: MenuItemView
    });

    /**
     * Lege MenuItemCollection instantieren, hier zullen menu-items in worden
     * opgeslagen
     */
    var menuItems = new MenuItemCollection();

    /**
     * Command handler registreren zodat andere modules menu-items kunnen
     * registreren.
     */
    App.commands.setHandler('addmenuitem', function(menuItem) {
        menuItems.add(menuItem);
    });

    /**
     * Dit wordt uitgevoerd als de applicatie start
     */
    MenuApp.on('start', function() {
        var menuView = new MenuListView({
            collection: menuItems
        });

        App.getRegion('menu').show(menuView);
    });
});
