// eslint-disable import/prefer-default-export
import { RESET_ERRORS } from '../constants/actionTypes';

export const resetErrors = () => (dispatch) => dispatch({ type: RESET_ERRORS });
