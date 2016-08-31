let data = require('../../data/species.js');
let hks = require('./hk.js');
let fs = require('fs');
let result = {};

for(let i in data) {
  let k = data[i].name;
  let v = hks[i];
  result[k] = v;
}

fs.writeFileSync('name_hk.js', JSON.stringify(result));
