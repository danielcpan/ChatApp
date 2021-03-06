import axios from 'axios';

import {
  GET_CHAT,
  GET_CHATS,
  CREATE_CHAT,
  UPDATE_CHAT,
  DELETE_CHAT,
} from '../constants/actionTypes';

export const getChat = id => async (dispatch, getState) => {
  try {
    const response = await axios.get(`/api/chats/${id}`, {
      headers: { Authorization: `Bearer ${getState().auth.token}` },
    });
    dispatch({
      type: GET_CHAT,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: 'GET_CHAT_ERROR',
      error: err.response.data,
    });
  }
};

export const getChats = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(`/api/chats`, {
      headers: { Authorization: `Bearer ${getState().auth.token}` },
    });
    dispatch({
      type: GET_CHATS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: 'GET_CHATS_ERROR',
      error: err.response.data,
    });
  }
};

export const createChat = data => async (dispatch, getState) => {
  try {
    const response = await axios.post(`/api/chats`, data, {
      headers: { Authorization: `Bearer ${getState().auth.token}` },
    });
    dispatch({
      type: CREATE_CHAT,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: 'CREATE_CHAT_ERROR',
      error: err.response.data,
    });
  }
};

export const updateChat = data => async (dispatch, getState) => {
  try {
    const response = await axios.put(`/api/chats/${data.id}`, data, {
      headers: { Authorization: `Bearer ${getState().auth.token}` },
    });
    dispatch({
      type: UPDATE_CHAT,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: 'UPDATE_CHAT_ERROR',
      error: err.response.data,
    });
  }
};

export const deleteChat = id => async (dispatch, getState) => {
  try {
    const response = await axios.delete(`/api/chats/${id}`, {
      headers: { Authorization: `Bearer ${getState().auth.token}` },
    });
    dispatch({
      type: DELETE_CHAT,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: 'DELETE_CHAT_ERROR',
      error: err.response.data,
    });
  }
};

export const sendMessage = data => async (dispatch, getState) => {
  try {
    const response = await axios.post(`/api/messages/send`, data, {
      headers: { Authorization: `Bearer ${getState().auth.token}` },
    });

    dispatch({
      type: 'SEND_MESSAGE',
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: 'SEND_MESSAGE_ERROR',
      error: err.response.data,
    });
  }
};
