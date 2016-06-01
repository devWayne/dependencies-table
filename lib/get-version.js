const fetch = require('node-fetch');



function unique(array) {
    var n = []; //临时数组
    for (var i = 0; i < array.length; i++) {
        if (n.indexOf(array[i]) == -1) n.push(array[i]);
    }
    return n;
}

module.exports = {
    getModuleList: function(bizGITList) {
        return this.getSeedList(bizGITList)
            .then((seedList) => {
                return seedList.map(seed => {
                    return Object.keys(seed.packages)
                });
            }).then(moduleList => {
                var totalList = [];
                moduleList.forEach((module, index) => {
                    totalList = totalList.concat(module);
                });
                return unique(totalList);
            }).catch((e) => {
                console.log('getModuleList' + e);
            });
    },
    getVersionList: function(seedList, module) {
        return seedList.map((seed, index) => {
            if (seed.packages[module]) return seed.packages[module].version;
            return '';
        });
    },
    getSeedList: function(bizGITList) {
        return Promise.all(bizGITList.map(url =>
            fetch(url).then(resp => resp.json())
        )).catch((e) => {
            console.log('getSeedList:' + e);
        });
    }
}
