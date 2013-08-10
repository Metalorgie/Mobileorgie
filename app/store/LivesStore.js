/*
 * File: app/store/LivesStore.js
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

Ext.define('Metalorgie.store.LivesStore', {
    extend: 'Ext.data.Store',

    requires: [
        'Metalorgie.model.Live'
    ],

    config: {
        model: 'Metalorgie.model.Live',
        storeId: 'LivesStore',
        proxy: {
            type: 'jsonp',
            url: 'http://www.metalorgie;com/api/lives.php',
            reader: {
                type: 'json'
            }
        }
    }
});