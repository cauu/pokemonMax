let origin = require('./pokemon-list.js');
let newData = require('./species.js');
let skillData = require('./skill.js');
let result = [];
let fs = require('fs');

for(let i = 0; i< origin.length; i++) {
  let { attributes, hpRatio, defenseRatio, 
    attackRati, overallRatio, catchRate, fleeRate, 
    incubateDistance, candyToEvolve, cpTier, hpTier }  =  newData[i];

  let { base, special, rank, attackRank, defendRank } = skillData[i];

  result.push(Object.assign({}, 
    origin[i],
    {
      attributes,
      hp_ratio: hpRatio,
      defense_ratio: defenseRatio,
      attack_ratio: attackRati,
      overall_ratio: overallRatio,
      catch_rate: catchRate,
      flee_rate: fleeRate,
      incubate_distance: incubateDistance,
      candy_to_evolve: candyToEvolve,
      cp_tier: cpTier,
      hp_tire: hpTier
    },
    {
      base,
      special,
      rank, 
      attack_rank: attackRank,
      defend_rank: defendRank
    }
    ));
}

// console.log(JSON.stringify(result));
fs.writeFileSync('../../data/species.js', JSON.stringify(result));

