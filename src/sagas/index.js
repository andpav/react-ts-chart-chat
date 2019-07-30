import { put, takeEvery, all, select, call, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import axios from 'axios';

import {
  signIn,
  setAuthorized,
  setLogin,
  setPassword,
  setError,
} from '../actions/login';

import {
  setData,
  setNewData,
} from '../actions/chart';

import {
  setConnection,
  setMessage,
  sendMessage,
} from '../actions/chat';

export function* setAuthorizedSaga({ payload }) {
  if (payload) {
    yield localStorage.setItem('authorized', String(payload));

    return;
  }

  yield localStorage.removeItem('authorized');
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
    yield put(setLogin(''));
    yield put(setPassword(''));
  } catch(error) {
    yield put(setError(true));
  }
}

export function* watchLogin() {
  yield takeEvery(setAuthorized, setAuthorizedSaga);
  yield takeEvery(signIn, loginSaga);
}

const websocketInitChannel = (url, callback) => eventChannel(emitter => {
  const socket = new WebSocket(url);

  socket.onmessage = (event) => {
    let parsedData;

    try {
      parsedData = JSON.parse(event.data);
    } catch (err) {
      console.log('parse JSON error');
    }

    if (parsedData) {
      emitter(callback(parsedData));
    }
  };

  return () => {
    console.log('socket off')
  }
});

export function* chartSaga() {
  const channel = yield call(websocketInitChannel, 'ws://localhost:8080/chart', setNewData);

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export function* watchChart() {
  yield takeEvery(setData, chartSaga)
}

export function* setConnectionSaga() {
  const channel = yield call(websocketInitChannel, 'ws://localhost:8080/chat', setMessage);

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export function* sendMessageSaga() {
}

export function* watchChat() {
  yield takeEvery(setConnection, setConnectionSaga)
  yield takeEvery(sendMessage, sendMessageSaga)
}

export default function* rootSaga() {
  yield all([
    // loadSaga(),
    watchLogin(),
    watchChart(),
    watchChat(),
  ])
}
