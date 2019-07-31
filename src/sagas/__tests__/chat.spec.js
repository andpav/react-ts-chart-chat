import { expectSaga } from 'redux-saga-test-plan';
import { sendMessageSaga } from '../chat';

import { sendMessageToSocket, setText } from '../../actions/chat';

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

  it('set authorized saga without text case', () => expectSaga(sendMessageSaga)
    .withState(storeState)
    .run());

  it('set authorized saga with text case', () => {
    const name = 'name';
    const text = '1234';

    storeState.chatReducer.text = text;
    storeState.loginReducer.login = name;

    return expectSaga(sendMessageSaga)
      .withState(storeState)

      .put(sendMessageToSocket({ name, text }))
      .put(setText(''))

      .run();
  });
});
