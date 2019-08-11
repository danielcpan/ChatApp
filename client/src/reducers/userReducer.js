import { 
  GET_USER, 
  GET_USERS,
  DELIVER_ONLINE_USERS_TO_ONLINE_CLIENTS
} from '../constants/actionTypes';

const initialState = {
  userList: [],
  onlineUsers: [],
};

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_USER:
    case GET_USERS:
      return {
        ...state,
        userList: action.payload
      }
    case DELIVER_ONLINE_USERS_TO_ONLINE_CLIENTS:
      return { 
        ...state, 
        onlineUsers: action.payload
      }
    default: 
      return state;
  }
}
