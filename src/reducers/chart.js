// @flow

import { handleActions } from 'redux-actions';
import { setNewData, reset } from '../actions/chart';
import { chartPoint } from '../typing/types';

type stateType = {
  data: Array<chartPoint>,
}

export const initialState: stateType = {
  data: [],
};

const MAX_CHART_POINTS = 9;

export default handleActions(
  {
    [setNewData]: (state: stateType, { payload }) => {
      const data = [...state.data];

      if (data.length > MAX_CHART_POINTS) {
        data.shift();
      }

      data.push(payload);

      return { ...state, data };
    },
    [reset]: () => initialState,
  }, initialState,
);
