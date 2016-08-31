const constant = require('../constant.js');
const pms = require('../data/pokemons.js');

const round = Math.round;
const pow = Math.pow;
const floor = Math.floor;
const sqrt = Math.sqrt;

const b = constant.b;
const a = constant.a;
const ecp = constant.ecp;

function _getPerfection(dura, off, def) {
  return {
    perfection: 100 * (dura + off * 2 + def)/60
  }
}

function _getIndividual(dura, off, def) {
  return {
    individual: dura + off * 2 + def
  }
}

function _getCPRange(number, level) {
  let s2 = (a[number - 1][0])*ecp[level];
  let a2 = (a[number - 1][1])*ecp[level];
  let d2 = (a[number - 1][2])*ecp[level];

  let range = {};
  range.mincp = floor(sqrt(s2)*sqrt(d2)*a2 / 10);

  s2 = (a[number - 1][0] + 15)*ecp[level];
  a2 = (a[number - 1][1] + 15)*ecp[level];
  d2 = (a[number - 1][2] + 15)*ecp[level];

  range.maxcp = floor(sqrt(s2)*sqrt(d2)*a2 / 10);

  return range;
}

function _getHPRange(number, level) {
  let s2 = (a[number - 1][0] + 15)*ecp[level];
  let a2 = (a[number - 1][1] + 15)*ecp[level];
  let d2 = (a[number - 1][2] + 15)*ecp[level];
  return {
    minhp: floor((a[number - 1][0])*ecp[level]),
    maxhp: floor((a[number - 1][0] + 15)*ecp[level])
  }
}

/*
 * Params:
 * 序号，耐久个体值，攻击个体值，防御个体值
 */
function _getCPGrowth(number, dura, off, def) {
  let sq1 = (a[number - 1][1] + off) * pow((a[number - 1][2] + def), 0.5) * pow((a[number - 1][0] + dura), 0.5)* 0.009426125469 / 10;
	
  let sq2 = (a[number - 1][1] + off) * pow((a[number - 1][2] + def), 0.5) * pow((a[number - 1][0] + dura), 0.5)* 0.008919025675 / 10;
  
  let sq3 = (a[number - 1][1] + off) * pow((a[number - 1][2] + def), 0.5) * pow((a[number - 1][0] + dura), 0.5)* 0.008924905903 / 10;
  
  let sq4 = (a[number - 1][1] + off) * pow((a[number - 1][2] + def), 0.5) * pow((a[number - 1][0] + dura), 0.5)* 0.00445946079 / 10;

  return {
    '18': sq1,
    '38': sq2,
    '58': sq3,
    '78': sq4
  }
}

/*
 * Description: 
 * 	 返回指定精灵满级（79级）时的hp和cp值;
 *   若不指定参数, 则返回对应满成长精灵的最大hp和cp
 * Params:
 *   序号，耐久个体值，攻击个体值，防御个体值
 */
function _getFullState(number, dura, off, def) {
  if(!dura || !off || !def) {
    return {
      fullcp: floor((a[number - 1][0] + 15)*ecp[79]),
      fullhp: floor((a[number - 1][1] + 15) * pow((a[number - 1][2] + 15), 0.5) * pow((a[number - 1][0] + 15), 0.5)* ecp[79]*ecp[79] / 10)
    }
  }

  return {
    fullcp: floor((a[number - 1][1] + off) * pow((a[number - 1][2] + def), 0.5) * pow((a[number - 1][0] + dura), 0.5)* ecp[79] * ecp[79] / 10),
    fullhp: floor((a[number - 1][0] + dura)*ecp[79])
  }
}

 /* Return:
 *   {
 *    '18': 1-18级升级提升cp
 *    '38': 19-38级升级提升cp
 *    '58': 39-58级升级提升cp
 *    '78': 59-78级升级提升cp,
 *    perfection: 完美度,
 *    individual: 个体值,
 *    maxcp: 该序号的精灵该等级时可能最大cp,
 *    mincp: 该序号的精灵该等级时可能最小cp,
 *    maxhp: 该序号的精灵该等级时可能最大hp,
 *    minhp: 该序号的精灵该等级时可能最小hp,
 *    fullcp: 该序号精灵可能最大cp,
 *    fullhp: 该序号精灵可能最大hp
 */
exports.getOverallStats = function *() {
  let { number, level, dura, off, def } = this.request.body;

  this.body = Object.assign(
    {}, 
    _getIndividual(dura, off, def),
    _getPerfection(dura, off, def),
    _getCPRange(number, level),
    _getHPRange(number, level),
    _getCPGrowth(number, dura, off, def),
    _getFullState(number, dura, off, def)
 );
}

exports.getPokemons = function *() {
  let query = this.request.query || {};

  if(query.id) {
    this.body = pms[query.id - 1];
  }

  else {
    this.body = pms;
  }
}

