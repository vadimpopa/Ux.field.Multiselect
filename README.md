Ux.field.Multiselect
====================

Multiselect field for Sencha Touch 2.1.

As I didn't like available extensions, I've extended Ext.field.Select widget and added the multiselect feature.  Works as a single or multi select field. So far only for tablets screens. 

It can easily extend Ext.field.Text if to take the missing code from Ext.field.Select and add it to Ux.field.Multiselect.

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
