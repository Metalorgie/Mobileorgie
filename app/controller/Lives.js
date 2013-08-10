/*
 * File: app/controller/Lives.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.2.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Metalorgie.controller.Lives', {
    extend: 'Ext.app.Controller',

    config: {
        control: {
            "#livesTab": {
                activate: 'onViewActivated'
            }
        }
    },

    onViewActivated: function(newActiveItem, container, oldActiveItem, eOpts) {
        var me = this;
        // use Metalorgie to get release
        me.getLives(function (store) {
            if (!store.loaded){
                Ext.Viewport.setMasked({ message: 'Chargement...' });
                // then bind data to list and show it
                me.getReleasesDataList().setStore(store);
                Ext.Viewport.setMasked(false);
            }
        });
    },

    getLives: function(callback) {
        var store = Ext.data.StoreManager.lookup('LivesStore');
        store.load(function() {
            callback(store);
        });
    },

    getLocation: function(callback) {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                callback(position);
            }, function(error) {
                // give a warning for error
            });
        }
    }

});