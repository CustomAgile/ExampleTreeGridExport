Ext.define('CustomAgile.export.records', {
    singleton: true,
});

CustomAgile.export.records = {
    arrayToCSV(recordArray, fileName, fields = ['Name']) {
        if (!_.isArray(recordArray)) {
            console.error('Export requires an array to be sent');
        }
        const mapArtifact = ((a) => {
            const a2 = {};
            fields.forEach((f) => { a2[f] = a[f]; });
            return a2;
        });
        const mappedArtifacts = recordArray.map(mapArtifact);
        const p = Papa.unparse(mappedArtifacts);

        CustomAgile.export.records.exportToFile(p, fileName);
    },

    exportToFile(csvString, filename = 'output.csv') {
        let blob = new Blob([csvString]);
        // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveBlob(blob, filename);
        } else {
            let a = window.document.createElement('a');
            a.href = window.URL.createObjectURL(blob, { type: 'text/plain' });
            a.download = filename;
            document.body.appendChild(a);
            a.click(); // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
            document.body.removeChild(a);
        }
    }
};

