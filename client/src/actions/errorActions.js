import { RESET_ERRORS } from '../constants/actionTypes';

export const resetErrors = () => dispatch => {
  return dispatch({ type: RESET_ERRORS })
}
