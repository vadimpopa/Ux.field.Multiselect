Ux.field.Multiselect
====================

Multiselect field for Sencha Touch 2.1.

As I didn't like available extensions, I've extended Ext.field.Select widget and added the multiselect feature.  Works as a single or multi select field.

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
                    delimiter: ',', 
                    mode: 'SINGLE', // default is MULTI,
                    // value: ['first','second'] , init value with an array
                    // value: 'first,second', init value with a string
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
usePicker config won't work as it is always used a list on both tablets and phones


![Multiselect field](screenshot.png)
 