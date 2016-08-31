import { CALL_API } from '../middleware/api';
import LanguageActionType from '../constant/LanguageActionType.js';

export function changeLanguage(lan) {
  return {
    type: LanguageActionType.CHANGE_LANGUAGE,
    language: lan
  }
}
