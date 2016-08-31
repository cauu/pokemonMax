import keymirror from 'keymirror';

const PokemonActionType = keymirror({
  LOADED_POKEMONS: null,
  LOADED_POKEMON_DETAIL: null,
  CALC_POKEMON_STATS: null,
  RESET_POKEMON_STATS: null
  // LOADED_POKEMONS_ERROR: null,
  // CALC_POKEMON_STATS_ERROR: null
});

export default PokemonActionType;
