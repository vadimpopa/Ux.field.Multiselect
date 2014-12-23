{
    "classAlias": "widget.multiselectfield",
    "className": "Ux.field.Multiselect", 
    "inherits": "selectfield",
    "autoName": "MyMultiselectField",
    "toolbox": {
        "name": "Multiselect Field",
        "category": "Fields",
        "groups": ["Fields"]
    },

    configs: [{
        name: 'doneButton', 
        type: 'boolean',
        hidden: false,
        initialValue: true
    },{
        name: 'clearButton', 
        type: 'boolean', 
        hidden: false,
        initialValue: false 
    },{
         name: 'mode', 
         type: 'string', 
         hidden: false, 
         initialValue: 'MULTI'
    },{
         name: 'delimiter', 
         type: 'string', 
         hidden: false, 
         initialValue: ','
    }]
}