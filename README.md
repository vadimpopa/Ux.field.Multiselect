Ux.field.Multiselect
====================

Multiselect field for Sencha Touch 2.1.

Works as a single or multi select field. Extends Ext.field.Select but also you can easyly take the missing code from Ext.field.Select
and create an independent Ux.field.Multiselect widget which will extend from Ext.field.Text.

As single field:
```javascript
{
 xtype: 'multiselectfield',
 store: 'myStore',
 displayField: 'name',
 valueField: 'id',
 mode: 'SINGLE',
}
```

As multi select field:
```javascript
{
 xtype: 'multiselectfield',
 store: 'myStore',
 displayField: 'name',
 valueField: 'id'
}
```
