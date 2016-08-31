let data = require('../../data/species.js');
let fs = require('fs');
let result = {};

for(let i in data) {
  let k = data[i].name;
  let v = data[i].name;
  result[k] = v;
}

fs.writeFileSync('name_en.js', JSON.stringify(result));
