import axios from 'axios';

import { 
  GET_CHAT, 
  GET_CHATS, 
  CREATE_CHAT, 
  UPDATE_CHAT, 
  DELETE_CHAT,
  CREATE_MESSAGE 
} from './types';

export const getChat = (id) => async dispatch => {
  const response = await axios.get(`http://localhost:5000/api/chats/${id}`);
  console.log(response.data)
  dispatch({
    type: GET_CHAT,
    payload: response.data
  })
}

export const getChats = () => async dispatch => {
  const response = await axios.get('http://localhost:5000/api/chats');
  dispatch({
    type: GET_CHATS,
    payload: response.data
  })
}

export const createChat = () => dispatch => {

}

export const updateChat = () => dispatch => {

}

export const deleteChat = () => dispatch => {

}

export const createMessage = (data) => async dispatch => {
  const response = await axios.post('http://localhost:5000/api/messages', data);
  console.log("in here response")
  console.log(response)
  dispatch({
    type: CREATE_MESSAGE,
    payload: response.data
  })
}