import { expectSaga } from 'redux-saga-test-plan';
import { setAuthorizedSaga, loginSaga } from '../login';

import { removeConnections, setError } from '../../actions/login';
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

  it('set authorized saga login case', () => expectSaga(setAuthorizedSaga, true)
    .withState(storeState)

    .run());

  it('set authorized saga logout case', () => expectSaga(setAuthorizedSaga, false)
    .withState(storeState)

    .put(removeConnections())
    .put(resetChat())
    .put(resetChart())

    .run());

  it('login saga success case', () => expectSaga(loginSaga)
    .withState(storeState)

  // TODO: test with mock axios.post

    .run());

  it('login saga error case', () => expectSaga(loginSaga)
    .withState(storeState)
    .put(setError(true))
    .run());
});
