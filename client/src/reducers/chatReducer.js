import {
  GET_CHAT,
  GET_CHATS,
  CREATE_CHAT,
  UPDATE_CHAT,
  DELETE_CHAT,
  SEND_MESSAGE,
  DELIVER_MESSAGE_TO_ONLINE_CLIENTS,
  DELIVER_CREATED_CHAT_TO_ONLINE_CLIENTS,
} from '../constants/actionTypes';
import { JOIN_CHAT } from '../constants/socketEventTypes';
import { socket } from '../index';

const initialState = {
  currentChat: {},
  chatsList: [],
  messages: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CHAT:
      socket.emit(JOIN_CHAT, action.payload.id);
      return {
        ...state,
        currentChat: action.payload,
        messages: action.payload.messages,
      };
    case GET_CHATS:
      return {
        ...state,
        chatsList: action.payload,
      };
    case CREATE_CHAT:
      socket.emit(CREATE_CHAT, action.payload);
      return {
        ...state,
        chatsList: [action.payload, ...state.chatsList],
      };
    case UPDATE_CHAT:
    case DELETE_CHAT:
    case SEND_MESSAGE:
      socket.emit(SEND_MESSAGE, action.payload);
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case DELIVER_MESSAGE_TO_ONLINE_CLIENTS:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case DELIVER_CREATED_CHAT_TO_ONLINE_CLIENTS:
      return {
        ...state,
        chatsList: [action.payload, ...state.chatsList],
      };
    default:
      return state;
  }
};
