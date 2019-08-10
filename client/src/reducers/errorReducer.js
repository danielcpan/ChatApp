import { RESET_ERRORS } from '../constants/actionTypes';

export default (state = null, action) => {
  const { type, error } = action
  
  if (type === RESET_ERRORS) {
    return null
  } else if (error) {
    return error
  } else {
    return null // Else reset if no errors
  }
}
