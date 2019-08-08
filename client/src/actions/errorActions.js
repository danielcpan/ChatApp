import { RESET_ERRORS } from './types';

export const resetErrors = () => dispatch => {
  return dispatch({ type: RESET_ERRORS })
}
