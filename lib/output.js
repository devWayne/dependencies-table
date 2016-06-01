'use strict';

const colors = require('colors/safe');

const Table = require('cli-table');
const Parse = require('./parse');
const Version = require('./get-version');



var data = Parse('dependencies.json');


var bizList = data.bizList.unshift('');
// instantiate
var table = new Table({
    head: data.bizList,
    //colWidths: 50,
    style: {
        head: ['blue']
    }
});



var totalList = [];

Version.getModuleList(data.bizGITList)
    .then(totalList => {

        console.log(totalList);
        Version.getSeedList(data.bizGITList)
            .then((seedList, index) => {

                totalList.forEach((module, index) => {
                    var v = Version.getVersionList(seedList, module);
                    v.unshift(totalList[index]);
                    table.push(v);
                });
                console.log(table.toString());

            });


    });
