import { handleActions } from 'redux-actions';
import { setNewData } from '../actions/chart';

const data = [
  {
    name: 1, uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 2, uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 3, uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 4, uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 5, uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 6, uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 7, uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 8, uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 9, uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 10, uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 11, uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 12, uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 13, uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 14, uv: 3490, pv: 4300, amt: 2100,
  },
];

const initialState = {
  data,
};

export default handleActions(
  {
    [setNewData]: (state, { payload }) => {
      const data = [...state.data];

      // replace with slice/splice
      data.shift();
      data.push(payload);

      return { ...state, data };
    },
  }, initialState);
