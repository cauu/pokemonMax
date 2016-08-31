import { CALL_API } from '../middleware/api';
import PokemonActionType from '../constant/PokemonActionType.js';
import ErrorActionType from '../constant/ErrorActionType.js';

export function loadPokemons() {
  return {
    [CALL_API]: {
      method: 'get',
      path: `/api/pokemon`,
      successType: PokemonActionType.LOADED_POKEMONS,
      errorType: ErrorActionType.LOADED_POKEMONS_ERROR
    }
  }
}

export function loadPokemonDetail({ id }) {
  return {
    [CALL_API]: {
      method: 'get',
      path: '/api/pokemon',
      query: {
        id: id
      },
      successType: PokemonActionType.LOADED_POKEMON_DETAIL
    }
  }
}

//Params should be an array of pokemon states
//For example: 
//[
//  {
//    level: 41,
//    cp: 1455,
//    hp: 117,
//    number: 62
//  },
//  {
//    level: 42,
//    cp: 1478,
//    hp: 118,
//    number: 62
//  }
//]
export function calcPokemonStats(params) {
  return {
    [CALL_API]: {
      method: 'post',
      path: '/api/dust-calc',
      body: params,
      successType: PokemonActionType.CALC_POKEMON_STATS,
      errorType: ErrorActionType.CALC_POKEMON_STATS_ERROR
    }
  }
}

export function resetPokemonStats() {
  return {
    type: PokemonActionType.RESET_POKEMON_STATS
  }
}
