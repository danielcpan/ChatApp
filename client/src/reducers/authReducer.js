
import { 
  REGISTER, 
  LOGIN,
  LOGOUT,
  GET_CURRENT_USER
} from '../constants/actionTypes';

const initialState = {
  currentUser: {},
  token: localStorage.getItem('token'),
  isLoggedIn: !!localStorage.getItem('token'),
};

export default (state = initialState, action) => {
  switch(action.type) {
    case REGISTER:
    case LOGIN:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        currentUser: action.payload.user,
        token: action.payload.token,
        isLoggedIn: true
      }
    case LOGOUT:
      localStorage.clear();
      return {
        ...state,
        currentUser: {},
        token: '',
        isLoggedIn: false
      }
    case GET_CURRENT_USER: 
      return {
        ...state,
        currentUser: action.payload
      }
    default: 
      return state;
  }
}
