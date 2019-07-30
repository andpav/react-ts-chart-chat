import { handleActions } from 'redux-actions';
import { setNewData } from '../actions/chart';

const initialState = {
  data: [],
};

export default handleActions(
  {
    [setNewData]: (state, { payload }) => {
      const data = [...state.data];

      // replace with slice/splice
      if (data.length > 9) {
        data.shift();
      }

      data.push(payload);

      return { ...state, data };
    },
  }, initialState);
