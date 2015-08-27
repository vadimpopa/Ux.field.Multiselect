Ext.define('Ux.field.Multiselect', {
    extend: 'Ext.field.Select',
    alias : 'widget.multiselectfield',

    config: {
        delimiter: ',',

        mode: 'MULTI',

        doneButton: true,

        clearButton: false
    },

    /**
     * Updates the {@link #doneButton} configuration. Will change it into a button when appropriate, or just update the text if needed.
     * @param {Object} config
     * @return {Object}
     */
    applyDoneButton: function(config) {
        if (config) {
            if (Ext.isBoolean(config)) {
                config = {};
            }

            if (typeof config == "string") {
                config = {
                    text: config
                };
            }

            Ext.applyIf(config, {
                text: 'Done',
                ui: 'action',
                height: '20px',
                width: '40%',
                listeners: {
                    tap: this.onDoneButtonTap,
                    scope: this
                }
            });
        }

        return Ext.factory(config, 'Ext.Button', this.getDoneButton());
    },
	
	/**
     * Override destroy to make sure all components are cleaned up on destroy
     */
    destroy: function(){
	    if(this.getDoneButton()){
	        this.getDoneButton().destroy();
	    }
    
	    if(this.getClearButton()){
	        this.getClearButton().destroy();
	    }
    
	    if(this.getClearButton()){
	        this.getClearButton().destroy();
	    }
    
	    if(this.listPanel){
	        this.listPanel.destroy();
	    }
    
	    this.callParent(arguments);
	},

    applyClearButton: function(config) {
        if (config) {
            if (Ext.isBoolean(config)) {
                config = {};
            }

            if (typeof config == "string") {
                config = {
                    text: config
                };
            }

            Ext.applyIf(config, {
                text: 'Clear',
                ui: 'action',
                height: '20px',
                width: '40%',
                listeners: {
                    tap: this.onClearButtonTap,
                    scope: this
                }
            });
        }

        return Ext.factory(config, 'Ext.Button', this.getClearButton());
    },    

    /**
     * @private
     */
    getTabletPicker: function() {
        var me = this,
            config = me.getDefaultTabletPickerConfig(),
            listMode = me.getMode(),
            toolbar;

        if (!me.listPanel) {
            me.listPanel = Ext.create('Ext.Panel', Ext.apply({
                left: 0,
                top: 0,
                modal: true,
                cls: Ext.baseCSSPrefix + 'select-overlay',
                layout: 'fit',
                hideOnMaskTap: true,
                width: Ext.os.is.Phone ? '14em' : '18em',
                height: (Ext.os.is.BlackBerry && Ext.os.version.getMajor() === 10) ? '12em' : (Ext.os.is.Phone ? '12.5em' : '22em'),
                items: [{
                    xtype: 'list',
                    mode: listMode,
                    store: me.getStore(),
                    itemTpl: '<span class="x-list-label">{' + me.getDisplayField() + ':htmlEncode}</span>'
                },{
                    xtype: 'toolbar',
                    docked: 'bottom',
                    layout: {
                        pack: 'center',
                        type: 'hbox'
                    }
                }]
            }, config));

            if(listMode === 'SINGLE'){
                me.listPanel.down('list').on('itemtap',me.onListTap,me);
            }else{
                toolbar = me.listPanel.down('toolbar');
                config = this.getClearButton();

                if(config) {
                    toolbar.add(config);   
                }
                toolbar.add(this.getDoneButton());    
            }
        }
        return me.listPanel;
    },

    /**
     * @private
     */
    onListTap : function(list,index,target,record) {
        this.setValue(record);
        this.callParent();
    },

    /**
     * @private
     */
    onDoneButtonTap: function(){
        var records = this.listPanel.down('list').getSelection();
        this.setValue(records);
        this.superclass.onListTap.call(this);
    },

    /**
     * @private
     */
    onClearButtonTap: function(){
        this.listPanel.down('list').deselectAll();
        this.setValue(null);
        this.superclass.onListTap.call(this);
    }, 

    /**
     * @private
     */
    applyValue: function(value) {
        this.getOptions();
        return  this.getValueFromRecords(value,this.getValueField());
    },

    /**
     * @private
     */
    updateValue: function(newValue, oldValue) {
        var me = this,
            value = me.convertValue(newValue,me.getValueField(),me.getDisplayField());
            
      value = value.join(me.getDelimiter());
      me.superclass.superclass.updateValue.call(me,[value]);
    },

    /**
     * @private
     */
    convertValue: function(value,fieldIn,fieldOut){
        var delimiter = this.getDelimiter(),
            store = this.getStore(),
            i = 0,
            out = [],
            len,
            item;
        if (value) {
            if (delimiter && Ext.isString(value)) {
                value = value.split(delimiter);
            } else if (!Ext.isArray(value)) {
                value = [value];
            }

            for (len = value.length; i < len; ++i) {
                item = store.findRecord(fieldIn,value[i]);
                if(item)
                    out.push(item.get(fieldOut));
            }
        }
        return out;
    },

    /**
     * @private
     * Returns the value in array form from records
     */
    getValueFromRecords: function(value){
        var delimiter = this.getDelimiter(),
            valueField = this.getValueField(),
            i = 0,
            out = [],
            len,
            item;
        if (value) {
            if (delimiter && Ext.isString(value)) {
                value = value.split(delimiter);
            } else if (!Ext.isArray(value)) {
                value = [value];
            }
        
            for (len = value.length; i < len; ++i) {
                item = value[i];
                if (item && item.isModel) {
                    out.push(item.get(valueField));
                }
            }
            out = Ext.Array.unique(out);
        }
        return out.length > 0 ? out : value;
    },

    /**
     * @private
     */
    getRecordsFromValue: function(value){
        var records = [],
            all = this.getStore().getRange(),
            valueField = this.getValueField(),
            i = 0,
            allLen = all.length,
            rec,
            j,
            valueLen;

        if(value){
            for (valueLen = value.length; i < valueLen; ++i) {
                for (j = 0; j < allLen; ++j) {
                    rec = all[j];   
                    if (rec.get(valueField) == value[i]) {
                        records.push(rec);
                        break;
                    }
                }   
            }
        }
        return records;
    },

    /**
     * Returns the current selected {@link Ext.data.Model records} instances selected in this field.
     * @return {Ext.data.Model[]} An array of Records.
     */
    getSelection: function() {
        return this.listPanel.down('list').getSelection();
    },

    /**
     * Returns the current selected records as an array of their valueFields.
     * @return {Array} An array of valueFields
     */
    getValue: function() {
        return this._value;
    },

    /**
     * @private
     */
    onChange: function(component, newValue, oldValue) {
        var me = this,
            old = me.convertValue(oldValue,me.getDisplayField(),me.getValueField());

        me.fireEvent('change', me, me.getValue(), old);
    },

    /**
     * Shows the picker for the select field, whether that is a {@link Ext.picker.Picker} or a simple
     * {@link Ext.List list}.
     */
    showPicker: function() {
        var me = this,
            store = this.getStore();

        //check if the store is empty, if it is, return
        if (!store || store.getCount() === 0) {
            return;
        }

        if (me.getReadOnly()) {
            return;
        }

        me.isFocused = true;

        var listPanel = me.getTabletPicker(),
            list = listPanel.down('list'),
            index, records,
            value = me.getValue();

        if (!listPanel.getParent()) {
            Ext.Viewport.add(listPanel);
        }

        if(value){
            records = me.getRecordsFromValue(value);
            list.select(records, null, true);
        }else{
            list.deselectAll();
        }

        listPanel.showBy(me.getComponent(), (Ext.os.is.BlackBerry && Ext.os.version.getMajor() === 10) ? 't-b' : null);
    },
    
    /**
     * Called when the internal {@link #store}'s data has changed.
     */
    onStoreDataChanged: function(store) {
        var me = this,
            initialConfig = me.getInitialConfig(),
            value = me.getValue();

        if (value || value === 0) {
            me.updateValue(me.applyValue(value));
        }

        if (me.getValue() === null) {
            if (initialConfig.hasOwnProperty('value')) {
                me.setValue(initialConfig.value);
            }

            if (me.getValue() === null && me.getAutoSelect()) {
                if (store.getCount() > 0) {
                    me.setValue(store.getAt(0));
                }
            }
        }
    }
});
