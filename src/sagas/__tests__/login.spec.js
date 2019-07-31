import { setAuthorizedSaga, loginSaga } from '../login';
// import * as matchers from 'redux-saga-test-plan/matchers';
import { expectSaga } from 'redux-saga-test-plan';

import { removeConnections } from '../../actions/login';
import { reset as resetChat } from '../../actions/chat';
import { reset as resetChart } from '../../actions/chart';

describe('Login sagas', () => {
  let storeState;

  beforeEach(() => {
    storeState = {
      chatReducer: {
        messages: [],
        text: '',
        error: false,
      },
      loginReducer: {
        authorized: false,
        login: '',
        password: '',
        error: false,
      },
    };
  });

  it('set authorized saga login case', () => {
    return expectSaga(setAuthorizedSaga, true)
      .withState(storeState)

      .run();
  });

  it('set authorized saga logout case', () => {
    return expectSaga(setAuthorizedSaga, false)
      .withState(storeState)

      .put(removeConnections())
      .put(resetChat())
      .put(resetChart())

      .run();
  });
});