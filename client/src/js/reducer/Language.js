import ActionType from '../constant/LanguageActionType.js';
import Immutable from 'immutable';

let defaultState =  'en_us';

export default function(state = defaultState, action) {
  let _lan = action.language;

  switch(action.type) {
    case ActionType.CHANGE_LANGUAGE:
      state = _lan;
      return state;
    default:
      return state;
  }
}

