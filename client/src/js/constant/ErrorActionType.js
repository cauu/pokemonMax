import keymirror from 'keymirror';

const ErrorActionType = keymirror({
  LOADED_POKEMONS_ERROR: null,
  CALC_POKEMON_STATS_ERROR: null,
  RESET_ERROR: null
});

export default ErrorActionType;
