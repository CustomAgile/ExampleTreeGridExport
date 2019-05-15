Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    launch() {
        Ext.create('Rally.data.wsapi.TreeStoreBuilder').build({
            models: ['userstory'],
            autoLoad: true,
            enableHierarchy: true
        }).then({
            success: this._onStoreBuilt,
            scope: this
        });
    },

    _onStoreBuilt(store) {
        this.add({
            xtype: 'rallytreegrid',
            store,
            context: this.getContext(),
            enableEditing: false,
            enableBulkEdit: false,
            shouldShowRowActionsColumn: false,
            enableRanking: false,
            columnCfgs: [
                'Name',
                'ScheduleState',
                'Owner'
            ]
        });
    }
});
