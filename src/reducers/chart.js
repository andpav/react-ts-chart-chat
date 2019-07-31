import { handleActions } from 'redux-actions';
import { setNewData, reset } from '../actions/chart';

export const initialState = {
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
    [reset]: () => initialState,
  }, initialState);
