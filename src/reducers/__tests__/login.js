import * as actionList from '../../actions/login';
import loginReducer, { initialState as loginInitialState } from '../login';

describe('Login reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = loginInitialState;
  });

  it('validate authorized', () => {
    const data = true;
    const newState = Object.assign({}, initialState, { authorized: data });

    expect(loginReducer(initialState, actionList.setAuthorized(data))).toEqual(newState);
  });

  it('validate login', () => {
    const data = '1234';
    const newState = Object.assign({}, initialState, { login: data });

    expect(loginReducer(initialState, actionList.setLogin(data))).toEqual(newState);
  });

  it('validate password', () => {
    const data = '1234';
    const newState = Object.assign({}, initialState, { password: data });

    expect(loginReducer(initialState, actionList.setPassword(data))).toEqual(newState);
  });

  it('validate error', () => {
    const data = true;
    const newState = Object.assign({}, initialState, { error: data });

    expect(loginReducer(initialState, actionList.setError(data))).toEqual(newState);
  });
});
