import axios from 'axios';

import { GET_USERS } from '../constants/actionTypes';

const SERVER_URL = 'http://localhost:5000';

export const getUser = (id) => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/users/${id}`, {
      headers: { Authorization: "Bearer " + getState().auth.token }
    });
    dispatch({
      type: 'GET_USER',
      payload: response.data
    })
  } catch (err) {
    dispatch({
      type: 'GET_USER_ERROR',
      error: err.response.data
    })
  }
}

export const getUsers = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/users`, {
      headers: { Authorization: "Bearer " + getState().auth.token }
    });
    dispatch({
      type: GET_USERS,
      payload: response.data
    })
  } catch (err) {
    dispatch({
      type: 'GET_USERS_ERROR',
      error: err.response.data
    })
  }
}
