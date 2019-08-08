import { RESET_ERRORS } from './types';

export const resetErrors = () => dispatch => {
  console.log("this is being called")
  return dispatch({ type: RESET_ERRORS })
}
