import { createAction } from 'redux-actions';

export const signIn = createAction('LOGIN/SIGN_IN');
export const setAuthorized = createAction('LOGIN/SET_AUTHORIZED');
export const setLogin = createAction('LOGIN/SET_LOGIN');
export const setPassword = createAction('LOGIN/SET_PASSWORD');
export const setError = createAction('LOGIN/SET_ERROR');
