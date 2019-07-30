import { handleActions } from 'redux-actions';
import { setText, setMessage } from '../actions/chat';

const initialState = {
  messages: [],
  text: '',
};

export default handleActions(
  {
    [setText]: (state, { payload }) => {
      return { ...state, text: payload };
    },
    [setMessage]: (state, { payload }) => {
      return { ...state, messages: [...state.messages, payload]};
    },
  }, initialState);
