import { GET_USERS } from '../actions/types';
import { socket } from '../index';

const initialState = {
  userList: [],
};

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_USERS:
      return {
        ...state,
        userList: action.payload
      }
    default: 
      return state;
  }
}
