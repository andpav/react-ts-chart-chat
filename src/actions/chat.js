import { createAction } from 'redux-actions';

export const setConnection = createAction('CHAT/SET_CONNECTION');
export const setText = createAction('CHAT/SET_TEXT');
export const setMessage = createAction('CHAT/SET_MESSAGE');
export const sendMessage = createAction('CHAT/SEND_MESSAGE');
