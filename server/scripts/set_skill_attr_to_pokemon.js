let fs = require('fs');
let pokemons = require('../data/species.js');
let skillAttrs = require('./skill_attr.js');

for(let i in pokemons) {
  let _base = pokemons[i].base;
  let _spe = pokemons[i].special;
  for(let j in _base) {
    _base[j]['attribute'] = skillAttrs[_base[j].name];
  }
  for(let k in _spe) {
    _spe[k]['attribute'] = skillAttrs[_spe[k].name];
  }
};

fs.writeFileSync('./new_spe.js', JSON.stringify(pokemons));

