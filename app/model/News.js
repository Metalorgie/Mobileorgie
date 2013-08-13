/*
 * File: app/model/News.js
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

Ext.define('Metalorgie.model.News', {
    extend: 'Ext.data.Model',

    uses: [
        'Metalorgie.model.Embed'
    ],

    config: {
        fields: [
            {
                name: 'id'
            },
            {
                convert: function(v, rec) {
                    //TODO : get link to news and map them to mobile app? (use Router?)
                    var regexp = '/http:\/\/www\.metalorgie\.(local|com)\/news\/(d+)_([^\/"]+)[^"]*"/';
                    return v.replace(/http:\/\/www\.metalorgie\.com\/news\/([0-9]*)_/,'/news/$1/');
                    console.log(v);
                    console.log(rec);
                },
                name: 'texte'
            },
            {
                name: 'date'
            },
            {
                name: 'additionalText'
            },
            {
                name: 'comments'
            },
            {
                name: 'url'
            },
            {
                name: 'level'
            },
            {
                name: 'image',
                type: 'string'
            }
        ],
        hasMany: {
            associationKey: 'embeds',
            model: 'Metalorgie.model.Embed',
            autoLoad: true,
            foreignKey: 'news_id',
            name: 'embeds'
        }
    }
});