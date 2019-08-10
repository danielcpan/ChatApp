import { combineReducers } from 'redux';
import authReducer from './authReducer';
import chatReducer from './chatReducer';
import userReducer from './userReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authReducer,
  chats: chatReducer,
  users: userReducer,
  errors: errorReducer
})