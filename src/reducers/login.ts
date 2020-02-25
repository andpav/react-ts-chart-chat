// @flow

import { handleActions } from 'redux-actions';
import * as actions from '../actions/login';

type stateType = {
  authorized: boolean;
  login: string;
  password: string;
  error: boolean;
}

export const initialState: stateType = {
  authorized: Boolean(localStorage.getItem('authorized')),
  login: localStorage.getItem('login') || '',
  password: '',
  error: false,
};

export default handleActions(
  {
    // @ts-ignore
    [actions.setAuthorized]: (state: stateType, { payload }) => ({ ...state, authorized: payload }),
    // @ts-ignore
    [actions.setLogin]: (state: stateType, { payload }) => ({ ...state, login: payload }),
    // @ts-ignore
    [actions.setPassword]: (state: stateType, { payload }) => ({ ...state, password: payload }),
    // @ts-ignore
    [actions.setError]: (state: stateType, { payload }) => ({ ...state, error: payload }),
  }, initialState,
);
