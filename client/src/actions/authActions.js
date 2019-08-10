import axios from 'axios';
import decode from 'jwt-decode';

import { 
  REGISTER,
  LOGIN,
  LOGOUT,
  GET_CURRENT_USER,
} from '../constants/actionTypes';

const SERVER_URL = 'http://localhost:5000';

// const token = localStorage.getItem('token')

export const register = data => async dispatch => {
  try {
    await axios.post(`${SERVER_URL}/api/auth/register`, data);

    try {
      dispatch({ type: REGISTER })
    } catch (err) {
      // Intentional Catch for undefined token, temporary solution
    }

    // dispatch(login(loginData))
  } catch (err) {
    dispatch({
      type: 'REGISTER_ERROR',
      error: err.response.data
    })
  }
}

export const login = data => async dispatch => {
  try {
    const response = await axios.post(`${SERVER_URL}/api/auth/login`, data);
    dispatch({
      type: LOGIN,
      payload: response.data
    })
  } catch (err) {
    dispatch({
      type: 'LOGIN_ERROR',
      error: err.response.data
    })
  }
}

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT })
}

export const getCurrentUser = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_CURRENT_USER,
      payload: decode(getState().auth.token)
    })
  } catch (err) {
    dispatch({
      type: 'GET_CURRENT_USER_ERROR',
      error: err
    })
  }
}