let constant = require('../constant.js');
let startDustList = require('../data/startdust-list.js');

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

function _starDustToLevel(dust, isPowered) {
  let level = [];

  for(let i = startDustList[dust].min; i <= startDustList[dust].max; i++) {
    if(isPowered) {
      level.push(i);
    }
    else {
      if(i%2 !== 0) {
        level.push(i);
      }
    }
  }

  return level;
}

function _calcSingle({ number, cp, hp, level }){
  let result = [];
  let s2, a2, d2;
  s2 = hp;
  let i1;
  let ii1;
  //let min = 10000;,Ω
  let i2, i3;
  let ii2, ii3;
  let q;
  let qq = new Array(17).fill(0); //length 17's array
  for(q = 0; q <= 15; q++) {
    //console.log(number, a[number - 1][0], q, level, ecp[level]);
    qq[q] = floor((a[number - 1][0] + q) * ecp[level]);
    //console.log(qq[q]);
  }
  for(q = 0; q <= 15; q++) {
    if(qq[q] == hp) break;
  }
  if(qq[q + 1] !== hp) {
    w = 1;
  }
  if(q === 15 && qq[q] < hp) {
    throw new Error('数据格式错误');
    // console.log('数据格式错误');
  }
  //console.log(qq, hp);
  while(qq[q] === hp) {
    for(i2 = 0; i2 <= 15; i2++) {
      for(i3 = 0; i3 <= 15; i3++) {
        s2 = (a[number - 1][0] + q) * ecp[level];
        a2 = (a[number - 1][1] + i2) * ecp[level];
        d2 = (a[number -1][2] + i3) * ecp[level];
        // console.log(q, i2, i3);
        let cp1 = floor(sqrt(s2) * sqrt(d2) * a2 / 10);
        if(cp1 == cp) {
          // xq[q][i2][i3]++;
          result.push(Object.assign(
            {},
            {
              dura: q,
              off: i2,
              def: i3
            },
            _getPerfection(q, i2, i3),
            _getIndividual(q, i2, i3)
          ));
        }
      }
    }
    q++;
  }

  return result;
}

function _getClosetResults(datas, results) {
  let _closest = {};
  let _result = [];

  for(let i in results) {
    let _situ = results[i];
    for(let j in _situ) {
      let k = JSON.stringify(_situ[j]);
      if(!_closest[k]) {
        _closest[k] = 1;
      }
      else {
        _closest[k]++;
      }
    }
  }

  for(let k in _closest) {
    _result.push(Object.assign(
      { }, 
      JSON.parse(k),
      {
        times: _closest[k]
      }
    ))
  }

  return _result;
}

function _calcPM(datas) { 
  let i, j, k;
  let result = [];
  let w = 0;

  for(let i in datas) {
    result.push(_calcSingle(datas[i]));
  }

  return _getClosetResults(datas, result);
}

exports.calcPMStatesByStardust = function *() {
  let params = this.request.body || {};

  for(let i in params) {
    let _p = params[i];
    for(let k in _p) {
      if(!isNaN(_p[k])) {
        _p[k] = Number(_p[k]);
      }
    }
  }

  let toLv = [];

  params.forEach((p) => {
    // let _level = _starDustToLevel(p.stardust, p.powerup === 'true');
    //第二个参数用来判断精灵是否强化过
    let _level = _starDustToLevel(p.stardust, true);
    for(let i in _level) {
      toLv.push(Object.assign({}, p, {
        level: _level[i]
      }));
    }
  });

  let _result = _calcPM(toLv);

  if(_result.length === 0) {
    let err = new Error('Data format error!');
    err.code = 405;
    throw err;
  }

  this.body = _result;
}

exports.calcPMStates = function *() {
  let params = this.request.body || {};

  for(let i in params) {
    let _p = params[i];
    for(let k in _p) {
      if(!isNaN(_p[k])) {
        _p[k] = Number(_p[k]);
      }
    }
  }

  let _result = _calcPM(params);

  if(_result.length === 0) {
    let err = new Error('Data format error!');
    err.code = 405;
    throw err;
  }

  this.body = _result;
}

// calcPM([
// 	{
// 		number: 62,
// 		cp: 1455,
// 		hp: 117,
// 		level: 41
// 	},
// 	{
// 		number: 62,
// 		cp: 1558,
// 		hp: 121,
// 		level: 44
// 	}
// ]);
//


