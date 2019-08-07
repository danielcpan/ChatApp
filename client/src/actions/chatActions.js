import axios from 'axios';

import { 
  GET_CHAT, 
  GET_CHATS, 
  CREATE_CHAT, 
  UPDATE_CHAT, 
  DELETE_CHAT,
  CREATE_MESSAGE 
} from './types';

const SERVER_URL = 'http://localhost:5000';

export const getChat = (id) => async dispatch => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/chats/${id}`);
    console.log("checking this1")
    console.log(response)
    dispatch({
      type: GET_CHAT,
      payload: response.data
    })
  } catch (err) {
    console.log("err")
    console.log(err.response)
    dispatch({
      type: 'GET_CHAT_ERROR',
      error: err
    })
  }
}

export const getChats = () => async dispatch => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/chats`);
    dispatch({
      type: GET_CHATS,
      payload: response.data
    })
  } catch (err) {
    console.log("qqqqqwwwww")
    console.log(err.response.data.message)
    dispatch({
      type: 'GET_CHATS_ERROR',
      error: err
    })
  }
}

export const createChat = (data) => async dispatch => {
  try {
    const response = await axios.post(`${SERVER_URL}/api/chats`, data);
    dispatch({
      type: CREATE_CHAT,
      payload: response.data
    })
  } catch (err) {
    dispatch({
      type: 'CREATE_CHAT_ERROR',
      error: err
    })
  }
}

export const updateChat = (data) => async dispatch => {
  try {
    const response = await axios.put(`${SERVER_URL}/api/chats/${data.id}`, data);
    dispatch({
      type: UPDATE_CHAT,
      payload: response.data
    })
  } catch (err) {
    dispatch({
      type: 'UPDATE_CHAT_ERROR',
      error: err
    })
  }
}

export const deleteChat = (id) => async dispatch => {
  try {
    const response = await axios.delete(`${SERVER_URL}/api/chats/${id}`);
    dispatch({
      type: DELETE_CHAT,
      payload: response.data
    })
  } catch (err) {
    dispatch({
      type: 'DELETE_CHAT_ERROR',
      error: err
    })
  }
}

export const sendMessage = (data) => async dispatch => {
  try {
    const response = await axios.post(`${SERVER_URL}/api/messages/send`, data);
    dispatch({
      type: CREATE_MESSAGE,
      payload: response.data
    })
  } catch (err) {
    dispatch({
      type: 'SEND_MESSAGE_ERROR',
      error: err
    })
  }
}