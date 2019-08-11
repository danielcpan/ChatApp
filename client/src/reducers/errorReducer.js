import { RESET_ERRORS } from '../constants/actionTypes';

export default (state = null, action) => { // eslint-disable-line no-unused-vars
  const { type, error } = action;

  if (type === RESET_ERRORS) {
    return null;
  } if (error) {
    return error;
  }
  return null; // Else reset if no errors
};
