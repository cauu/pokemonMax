import { CALL_API } from '../middleware/api';
import ErrorActionType from '../constant/ErrorActionType.js';

export function resetError() {
  return {
    type: ErrorActionType.RESET_ERROR
  }
}
