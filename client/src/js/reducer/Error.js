import ActionType from '../constant/ErrorActionType.js';
import Immutable from 'immutable';

let defaultState = Immutable.fromJS({
  text: "",
});

export default function(state = defaultState, action) {
  let _res = action.response;
  switch(action.type) {
    case ActionType.LOADED_POKEMONS_ERROR:
      return state
        .updateIn(['text'], value => "网络出了点问题!");
    case ActionType.CALC_POKEMON_STATS_ERROR: 
      return state
        .updateIn(['text'], value => '计算失败!请调整小精灵的数值(特别是等级).等级较低的精灵请升级后再计算.');
    case ActionType.RESET_ERROR: 
      return state
        .updateIn(['text'], value => '');
    default:
      return state;
  }
}

