import { 
  GET_CHAT, 
  GET_CHATS, 
  CREATE_CHAT, 
  UPDATE_CHAT, 
  DELETE_CHAT, 
  CREATE_MESSAGE
} from '../actions/types';
import { socket } from '../index';

const initialState = {
  currentChat: {},
  chatsList: [],
  messages: [],
};

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_CHAT:

      socket.emit('JOIN_CHAT_ROOM', action.payload.id)
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
    // case CREATE_MESSAGE: 
    //   const currentChatCopy = { 
    //     ...state.currentChat, 
    //     messages: [...state.currentChat.messages, action.payload],
    //     users: [...state.currentChat.users]
    //   }

    //   const chatsListCopy = state.chatsList.map(chat => {
    //     if (chat.id === action.payload.chatId) {
    //       return { 
    //         ...currentChatCopy, 
    //         messages: [...currentChatCopy.messages].reverse()
    //       }
    //     }
    //     return chat;
    //   })

    //   socket && socket.emit('UPDATE_CHAT', state);

    //   return {
    //     ...state,
    //     currentChat: currentChatCopy,
    //     chatsList: chatsListCopy
    //   }
    case 'SEND_MESSAGE':
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

      state = { 
        ...state, 
        currentChat: currentChatCopy,
        chatsList: chatsListCopy,
      }

      socket.emit('UPDATE_CHAT', state.currentChat)
      return state;
    case 'DELIVER_UPDATED_CHAT_TO_REDUCER':
      return { 
        ...state, 
        currentChat: action.payload
      };
    default: 
      return state;
  }
}
