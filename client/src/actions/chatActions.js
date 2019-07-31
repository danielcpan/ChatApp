import axios from 'axios';

import { 
  GET_CHAT, 
  GET_CHATS, 
  CREATE_CHAT, 
  UPDATE_CHAT, 
  DELETE_CHAT 
} from './types';

export const getChat = () => async dispatch => {
  console.log("inside action")
  const response = await axios.get('http://localhost:5000/api/chats/4');
  console.log(response.data)
  console.log("wow")
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
