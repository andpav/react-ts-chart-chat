import { put, takeEvery, all, select } from 'redux-saga/effects';
import axios from 'axios';

import {
  signIn,
  setAuthorized,
  setPassword,
  setError,
  removeConnections,
} from '../actions/login';

import {
  sendMessage,
  sendMessageToSocket,
  reset as resetChat,
  setText,
} from '../actions/chat';

import {
  reset as resetChart,
} from '../actions/chart';

// move to different sagas
export function* setAuthorizedSaga({ payload }) {
  if (payload) {
    yield localStorage.setItem('authorized', String(payload));

    return;
  }

  yield put(removeConnections());
  yield put(resetChat());
  yield put(resetChart());
  yield localStorage.removeItem('authorized');
  yield localStorage.removeItem('login');
}

export function* loginSaga() {
  const { login, password } = yield select((store) => store.loginReducer);

  try {
    yield axios.post('http://localhost:8080/login',
      JSON.stringify({ login, password }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    yield put(setAuthorized(true));
    yield localStorage.setItem('login', login);
    yield put(setPassword(''));
  } catch(error) {
    yield put(setError(true));
  }
}

export function* watchLogin() {
  yield takeEvery(setAuthorized, setAuthorizedSaga);
  yield takeEvery(signIn, loginSaga);
}

export function* sendMessageSaga() {
  const name = yield select(state => state.loginReducer.login);
  const text = yield select(state => state.chatReducer.text);

  if (text) {
    yield put(sendMessageToSocket({ name, text }));
    yield put(setText(''));
  }
}

export function* watchChat() {
  yield takeEvery(sendMessage, sendMessageSaga)
}

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchChat(),
  ])
}
