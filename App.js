Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    launch() {
        Ext.create('Rally.data.wsapi.TreeStoreBuilder').build({
            models: ['PortfolioItem/Initiative'],
            autoLoad: true,
            enableHierarchy: true
        }).then({
            success: this._onStoreBuilt,
            scope: this
        });
    },

    _onStoreBuilt(store) {
        let records = {};
        // gather all the work items when the store auto expands
        store.addListener(
            'load',
            (s, root) => {
                root.childNodes.forEach(({ data }) => {
                    records[data.ObjectID] = data;
                });
                if (root.data.ObjectID) {
                    records[root.data.ObjectID] = root.data;
                }
            }
        );
        this.grid = this.add({
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

        this.grid.expandAll(() => {
            setTimeout(() => {
                CustomAgile.export.records.arrayToCSV(_.values(records, 'test.csv'));
            }, 2000);
        });
    }
});
