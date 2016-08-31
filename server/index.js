const koa = require('koa');
const app = koa();

const errHandler = require('./middlewares/err-handler.js');///error handling

const cors = require('kcors');
const bodyParser = require('koa-body')();
const router = require('koa-router')(); //router

let pokemonCalc = require('./apis/pokemon-calc.js');
let pokemonStats = require('./apis/pokemon-stat.js');
let inventory = require('./apis/inventory.js');

router
  .get('/api/pokemon',pokemonStats.getPokemons)
  .post('/api/calc', pokemonCalc.calcPMStates)
  .post('/api/stats', pokemonStats.getOverallStats)
  .post('/api/inventory', inventory.getInventory)
  .post('/api/dust-calc', pokemonCalc.calcPMStatesByStardust)
;

app
  .use(bodyParser)
  .use(cors())
  .use(errHandler)
  .use(router.routes())
;

console.log('Server is listening on port: 3030');
app.listen(3030);
