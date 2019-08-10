import axios from 'axios';

import { GET_USERS } from './types';

const SERVER_URL = 'http://localhost:5000';

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
