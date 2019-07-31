import * as actionList from '../../actions/chart';
import chartReducer, { initialState as chartInitialState } from '../chart';

describe('Chart reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = chartInitialState;
  });

  it('setNewData', () => {
    const data = { name: '123' };
    const newState = Object.assign({}, initialState, { data: [data] });

    expect(chartReducer(initialState, actionList.setNewData(data))).toEqual(newState);

    // TODO: add test for case with > 9 new messages added consistently
  });

  it('validate reset', () => {
    const newState = Object.assign({}, initialState);

    expect(chartReducer(initialState, actionList.reset())).toEqual(newState);
  });
});
