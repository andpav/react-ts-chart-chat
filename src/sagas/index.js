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

const websocketChartInitChannel = () => eventChannel(emitter => {
  const chartSocket = new WebSocket("ws://localhost:8080/chart");

  chartSocket.onmessage = (event) => {
    let parsedData;

    try {
      parsedData = JSON.parse(event.data);
    } catch (err) {
      console.log('parse JSON error');
    }

    if (parsedData) {
      emitter(setNewData(parsedData));
    }
  };

  return () => {
    console.log('socket off')
  }
});

export function* chartSaga() {
  const channel = yield call(websocketChartInitChannel);

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export function* watchChart() {
  yield takeEvery(setData, chartSaga)
}

export default function* rootSaga() {
  yield all([
    // loadSaga(),
    watchLogin(),
    watchChart(),
  ])
}
