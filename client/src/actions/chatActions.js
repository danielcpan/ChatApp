import axios from 'axios';

import { 
  GET_CHAT, 
  GET_CHATS, 
  CREATE_CHAT, 
  UPDATE_CHAT, 
  DELETE_CHAT 
} from './types';

export const getChat = () => dispatch => {
}

export const getChats = () => async dispatch => {
  console.log("inside action")
  const response = await axios.get('http://localhost:5000/api/chats');
  // console.log("seeing inside response")
  // console.log(response)
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
