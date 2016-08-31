let skill = require('./skillDetail.js');
let fs = require('fs');
let result = {};

for(let i in skill) {
  result[skill[i].name] = skill[i].attribute;
}

fs.writeFileSync('./skill_attr.js', JSON.stringify(result));


