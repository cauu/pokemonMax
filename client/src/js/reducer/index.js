import { combineReducers } from 'redux';

import Pokemon from './Pokemon.js';
import Error from './Error.js';
import Language from './Language.js';

const rootReducer = combineReducers({
  pokemon: Pokemon,
  error: Error,
  language: Language
});


export default rootReducer;
