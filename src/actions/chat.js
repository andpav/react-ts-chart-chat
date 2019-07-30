import { createAction } from 'redux-actions';

export const setChatConnection = createAction('CHAT/SET_CONNECTION');
export const setText = createAction('CHAT/SET_TEXT');
export const setMessage = createAction('CHAT/SET_MESSAGE');
export const sendMessage = createAction('CHAT/SEND_MESSAGE');
export const sendMessageToSocket = createAction('CHAT/SEND_MESSAGE_TO_SOCKET');
export const setError = createAction('CHAT/SET_ERROR');
export const reset = createAction('CHAT/RESET');
