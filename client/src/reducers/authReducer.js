import { 
  REGISTER, 
  LOGIN,
} from '../actions/types';

const initialState = {
  currentUser: {},
  token: '',
};

export default (state = initialState, action) => {
  switch(action.type) {
    case REGISTER:
    case LOGIN:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        currentUser: action.payload.user,
        token: action.payload.token
      }
    default: 
      return state;
  }
}
