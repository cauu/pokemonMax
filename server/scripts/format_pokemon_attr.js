let fs = require('fs');
let pokemons = require('../data/pokemons.js');
const CN_ATTRS = {
  '草': 'grass',
  '毒': 'poison',
  '水': 'water',
  '钢': 'steel',
  '普': 'normal',
  '地': 'ground',
  '虫': 'bug',
  '恶': 'dark',
  '超': 'psychic',
  '电': 'thunder',
  '斗': 'fighting',
  '飞': 'flying',
  '岩': 'rock',
  '鬼': 'ghost',
  '火': 'fire',
  '冰': 'ice',
  '仙': 'fairy',
  '龙': 'dragon'
};

for(let i in pokemons) {
  let attr = pokemons[i].attributes.split(',');
  let tmpAttr = [];
  for(let j in attr) {
    if(CN_ATTRS[attr[j]]) {
      tmpAttr.push(CN_ATTRS[attr[j]]);
    }
  }
  pokemons[i].attributes = tmpAttr;
  let base = pokemons[i].base;
  let special = pokemons[i].special;
  for(let k in base) {
    base[k].attribute = CN_ATTRS[base[k].attribute];
  }
  for(let h in special) {
    special[h].attribute = CN_ATTRS[special[h].attribute];
  }
}

fs.writeFileSync('./poke.js', JSON.stringify(pokemons));

