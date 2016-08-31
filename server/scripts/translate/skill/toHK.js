let skill = require('./skillDetail.js');
let fs = require('fs');
let result = {};

for(let i in skill) {
  result[skill[i].name] = skill[i].nameTw;
}

fs.writeFileSync('./skill_hk.js', JSON.stringify(result));


