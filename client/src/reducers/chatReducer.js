import { 
  GET_CHAT, 
  GET_CHATS, 
  CREATE_CHAT, 
  UPDATE_CHAT, 
  DELETE_CHAT, 
  CREATE_MESSAGE
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
      return {
        ...state, 
        chatsList: [action.payload, ...state.chatsList]
      }
    case UPDATE_CHAT:
    case DELETE_CHAT:
    case CREATE_MESSAGE: 
      const currentChatCopy = { 
        ...state.currentChat, 
        messages: [...state.currentChat.messages, action.payload],
        users: [...state.currentChat.users]
      }

      const chatsListCopy = state.chatsList.map(chat => {
        if (chat.id === action.payload.chatId) {
          return { 
            ...currentChatCopy, 
            messages: [...currentChatCopy.messages].reverse()
          }
        }
        return chat;
      })

      return {
        ...state,
        currentChat: currentChatCopy,
        chatsList: chatsListCopy
      }
    default: 
      return state;
  }
}
