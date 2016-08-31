let pms = require('./pokemons.js');

let max = 0;
for(let i in pms) {
  console.log(pms[i].rank);
  if(pms[i].rank > max) {
    max = pms[i].rank;
  }
}

console.log(max);
