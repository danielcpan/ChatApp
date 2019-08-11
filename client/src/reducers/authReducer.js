
import {
  REGISTER,
  LOGIN,
  LOGOUT,
  GET_CURRENT_USER,
} from '../constants/actionTypes';
import {
  SET_ONLINE_USER,
  SET_OFFLINE_USER,
} from '../constants/socketEventTypes';
import { socket } from '../index';

const initialState = {
  currentUser: {},
  token: localStorage.getItem('token'),
  isLoggedIn: !!localStorage.getItem('token'),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
    case LOGIN:
      socket.emit(SET_ONLINE_USER, action.payload.user);
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        currentUser: action.payload.user,
        token: action.payload.token,
        isLoggedIn: true,
      };
    case LOGOUT:
      socket.emit(SET_OFFLINE_USER);
      localStorage.clear();
      return {
        ...state,
        currentUser: {},
        token: '',
        isLoggedIn: false,
      };
    case GET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};
