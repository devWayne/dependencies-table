'use strict';

const colors = require('colors/safe');

const Table = require('cli-table');

const Version = require('./getdata');



module.exports = (data) => {

    var bizList = data.bizList.unshift('');
    // instantiate
    var table = new Table({
        head: data.bizList,
        //colWidths: 50,
        style: {
            head: ['blue']
        }
    });



    Promise.all([Version.getModuleList(data.bizGITList), Version.getSeedList(data.bizGITList)])
        .then(res => {
            var totalList = res[0],
                seedList = res[1];
            totalList.forEach((module, index) => {
                var v = Version.getVersionList(seedList, module);
                v = colorful(v);

                v.unshift(totalList[index]);
                table.push(v);
            });
            console.log(table.toString());

        });

}

function colorful(list) {
    var max = MaxAndMin(list).max,
        min = MaxAndMin(list).min;
    list = list.map((item, index) => {
        if (max == item) {
            item = colors.green(item);
        } else if (min == item) {
            item = colors.red(item);
        }
        return item;

    });
    return list;
}

function MaxAndMin(list) {
    list = list.map((item, index) => {
        return parseInt(item.split('.').join(''));
    });
    var max = Math.max.apply(null, list);
    var min = Math.min.apply(null, list);
    max = max.toString().split('').join('.');
    min = min.toString().split('').join('.');
    return {
        max: max,
        min: min
    }
}
