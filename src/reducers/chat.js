import { handleActions } from 'redux-actions';
import { setText, setMessage, setError, reset } from '../actions/chat';

const initialState = {
  messages: [],
  text: '',
  error: false,
};

export default handleActions(
  {
    [setText]: (state, { payload }) => {
      return { ...state, text: payload };
    },
    [setMessage]: (state, { payload }) => {
      return { ...state, messages: [...state.messages, payload]};
    },
    [setError]: (state, { payload }) => {
      return { ...state, error: Boolean(payload)};
    },
    [reset]: () => initialState,
  }, initialState);
