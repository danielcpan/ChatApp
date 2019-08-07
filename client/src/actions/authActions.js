import axios from 'axios';

import { 
  REGISTER,
  LOGIN
} from './types';

const SERVER_URL = 'http://localhost:5000';

export const register = (data) => async dispatch => {
  try {
    const response = await axios.post(`${SERVER_URL}/api/auth/register`, data);
    dispatch({
      type: REGISTER,
      payload: response.data
    })
  } catch (err) {
    dispatch({
      type: 'REGISTER_ERROR',
      error: err.response.data
    })
  }
}

export const login = (data) => async dispatch => {
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
