/*
 * File: app/controller/Releases.js
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

Ext.define('Metalorgie.controller.Releases', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            releasesDataList: '#releasesDataList',
            releasesTab: '#releasesTab',
            tabNav: '#tabNav'
        },

        control: {
            "#releasesTab": {
                activate: 'onViewActivated'
            }
        }
    },

    onViewActivated: function(newActiveItem, container, oldActiveItem, eOpts) {
        var me = this;
        // use Metalorgie to get release
        me.getReleases(function (store) {
            if (!store.loaded){
                Ext.Viewport.setMasked({ message: 'Chargement...' });
                // then bind data to list and show it
                me.getReleasesDataList().setStore(store);
                Ext.Viewport.setMasked(false);
            }
        });
    },

    getReleases: function(callback) {
        var store = Ext.data.StoreManager.lookup('ReleasesStore');
        //store.getProxy().setUrl(url);
        store.load(function() {
            callback(store);
        });
    }

});