import { combineReducers } from 'redux';
import userReducer from './userReducer';
import chatReducer from './chatReducer';

const errorReducer = (state = null, action) => {
  const { type, error } = action

  if (type === 'RESET_ERROR_MESSAGE') {
    return null
  } else if (error) {
    console.log(error)
    return error
  }

  return state
}

export default combineReducers({
  user: userReducer,
  chats: chatReducer,
  errors: errorReducer
})