'use strict';
const fs = require('fs');
const path = require('path');

/**
 * @param {varType} biz Description
 * @return {void} description
 */
function gitlabUrl(biz){
    return 'http://gitlab.alibaba-inc.com/tm/'+biz+'/raw/master/src/seed.json'
}
/**
 * @param {varType} file Description
 * @return {void} description
 */
module.exports = (file) => {
    const configPath = path.resolve(process.cwd(), file);
    const config = JSON.parse(fs.readFileSync(configPath));

    let bizGITList = [], bizList = config.biz, moduleList=config.module;

    bizList.forEach((biz,index)=>{
        bizGITList.push(gitlabUrl(biz));
    });

    return {
        bizList: bizList,
        moduleList: moduleList,
        bizGITList:bizGITList
    }
}
