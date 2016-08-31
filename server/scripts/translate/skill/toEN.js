let skill = require('./skillDetail.js');
let fs = require('fs');
let result = {};

for(let i in skill) {
  result[skill[i].name] = skill[i].name;
}

fs.writeFileSync('./skill_en.js', JSON.stringify(result));


