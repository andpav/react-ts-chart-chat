// @flow

import { handleActions } from 'redux-actions';
import {
  setText,
  setMessage,
  setError,
  reset,
} from '../actions/chat';
import { chatMessage } from '../typing/types';

type stateType = {
  messages: Array<chatMessage>,
  text: string,
  error: boolean,
}

export const initialState: stateType = {
  messages: [],
  text: '',
  error: false,
};

export default handleActions(
  {
    [setText]: (state: stateType, { payload }) => ({ ...state, text: payload }),
    [setMessage]: (state: stateType, { payload }) => ({
      ...state,
      messages: [...state.messages, payload],
    }),
    [setError]: (state: stateType, { payload }) => ({ ...state, error: Boolean(payload) }),
    [reset]: () => initialState,
  }, initialState,
);
