Ux.field.Multiselect
====================

Multiselect field for Sencha Touch 2.1.

Works as a single or multi select field. Extends Ext.field.Select but also you can easyly take the missing code from Ext.field.Select
and create an independent Ux.field.Multiselect widget which will extend from Ext.field.Text.

Usage
```javascript
Ext.create('Ext.form.Panel', {
    fullscreen: true,
    items: [
        {
            xtype: 'fieldset',
            title: 'Select',
            items: [
                {
                    xtype: 'selectfield',
                    label: 'Choose one',
                    mode: 'SINGLE', // default is MULTI
                    options: [
                        {text: 'First Option',  value: 'first'},
                        {text: 'Second Option', value: 'second'},
                        {text: 'Third Option',  value: 'third'}
                    ]
                }
            ]
        }
    ]
});
```
