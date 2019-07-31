import { handleActions } from 'redux-actions';
import {
  setText,
  setMessage,
  setError,
  reset,
} from '../actions/chat';

export const initialState = {
  messages: [],
  text: '',
  error: false,
};

export default handleActions(
  {
    [setText]: (state, { payload }) => ({ ...state, text: payload }),
    [setMessage]: (state, { payload }) => ({ ...state, messages: [...state.messages, payload] }),
    [setError]: (state, { payload }) => ({ ...state, error: Boolean(payload) }),
    [reset]: () => initialState,
  }, initialState,
);
