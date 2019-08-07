import { 
  REGISTER, 
  LOGIN,
} from '../actions/types';

const initialState = {
  currentUser: {},
};

export default (state = initialState, action) => {
  switch(action.type) {
    case REGISTER:
      // return {
      //   ...state,
      //   currentChat: action.payload
      // }
    case LOGIN:
      return {
        ...state,
        currentUser: action.payload
      }
    default: 
      return state;
  }
}
