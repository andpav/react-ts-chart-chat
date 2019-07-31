// @flow

import { handleActions } from 'redux-actions';
import * as actions from '../actions/login';

export const initialState = {
  authorized: Boolean(localStorage.getItem('authorized')),
  login: localStorage.getItem('login') || '',
  password: '',
  error: false,
};

export default handleActions(
  {
    [actions.setAuthorized]: (state, { payload }) => ({ ...state, authorized: payload }),
    [actions.setLogin]: (state, { payload }) => ({ ...state, login: payload }),
    [actions.setPassword]: (state, { payload }) => ({ ...state, password: payload }),
    [actions.setError]: (state, { payload }) => ({ ...state, error: payload }),
  }, initialState,
);
