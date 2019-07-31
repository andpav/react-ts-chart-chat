import * as actionList from '../../actions/chat';
import chatReducer, { initialState as chatInitialState } from '../chat';

describe('Chat reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = chatInitialState;
  });

  it('validate text', () => {
    const data = '1234';
    const newState = Object.assign({}, initialState, { text: data });

    expect(chatReducer(initialState, actionList.setText(data))).toEqual(newState);
  });

  it('validate messages', () => {
    const data = { name: '123', text: '456' };
    const newState = Object.assign({}, initialState, { messages: [data] });

    expect(chatReducer(initialState, actionList.setMessage(data))).toEqual(newState);

    // TODO: add test for case with few messages added consistently
  });

  it('validate error', () => {
    const data = true;
    const newState = Object.assign({}, initialState, { error: data });

    expect(chatReducer(initialState, actionList.setError(data))).toEqual(newState);
  });

  it('validate reset', () => {
    const newState = Object.assign({}, initialState);

    expect(chatReducer(initialState, actionList.reset())).toEqual(newState);
  });
});
