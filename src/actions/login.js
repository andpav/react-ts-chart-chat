import { createAction } from 'redux-actions';

export const signIn = createAction('SIGN_IN');
export const setAuthorized = createAction('SET_AUTHORIZED');
export const setLogin = createAction('SET_LOGIN');
export const setPassword = createAction('SET_PASSWORD');
export const setError = createAction('SET_ERROR');
