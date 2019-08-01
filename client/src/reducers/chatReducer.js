import { 
  GET_CHAT, 
  GET_CHATS, 
  CREATE_CHAT, 
  UPDATE_CHAT, 
  DELETE_CHAT 
} from '../actions/types';

const initialState = {
  currentChat: {},
  chatsList: [],
};

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_CHAT:
        return {
          ...state,
          currentChat: action.payload
        }      
    case GET_CHATS:
      return {
        ...state,
        chatsList: action.payload
      }
    case CREATE_CHAT:
    case UPDATE_CHAT:
    case DELETE_CHAT:
    default: 
      return state;
  }
}
