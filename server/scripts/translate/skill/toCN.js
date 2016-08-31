let skill = require('./skillDetail.js');
let fs = require('fs');
let result = {};

for(let i in skill) {
  result[skill[i].name] = skill[i].nameZh;
}

fs.writeFileSync('./skill_cn.js', JSON.stringify(result));


