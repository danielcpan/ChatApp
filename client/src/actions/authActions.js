import axios from 'axios';
import decode from 'jwt-decode';

import {
  REGISTER,
  LOGIN,
  LOGOUT,
  GET_CURRENT_USER,
} from '../constants/actionTypes';

export const register = data => async (dispatch) => {
  try {
    await axios.post(`/api/auth/register`, data);
    try {
      dispatch({ type: REGISTER });
    } catch (err) {
      // Intentional Catch for undefined token, temporary solution
    }
  } catch (err) {
    dispatch({
      type: 'REGISTER_ERROR',
      error: err.response.data,
    });
  }
};

export const login = data => async (dispatch) => {
  try {
    const response = await axios.post(`/api/auth/login`, data);
    dispatch({
      type: LOGIN,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: 'LOGIN_ERROR',
      error: err.response.data,
    });
  }
};

export const logout = () => (dispatch, getState) => {
  dispatch({ type: LOGOUT, payload: getState().auth.currentUser });
};

export const getCurrentUser = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_CURRENT_USER,
      payload: decode(getState().auth.token),
    });
  } catch (err) {
    dispatch({
      type: 'GET_CURRENT_USER_ERROR',
      error: err,
    });
  }
};
