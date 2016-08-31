import ActionType from '../constant/PokemonActionType.js';
import Immutable from 'immutable';

let defaultState = Immutable.fromJS({
  list: [],
  detail: {},
  stats: []
});

export default function(state = defaultState, action) {
  let _res = action.response;

  switch(action.type) {
    case ActionType.LOADED_POKEMONS:
      return state
        .updateIn(['list'], list => Immutable.fromJS(_res))
      ;
    case ActionType.LOADED_POKEMON_DETAIL:
      return state
        .updateIn(['detail'], value => Immutable.fromJS(_res))
      ;
    case ActionType.CALC_POKEMON_STATS:
      return state
        .updateIn(['stats'], value => Immutable.fromJS(_res))
      ;
    case ActionType.RESET_POKEMON_STATS: 
      return state
        .updateIn(['stats'], value => Immutable.fromJS([]))
      ;
    default:
      return state;
  }
}

