import { put, takeEvery, all, delay, select } from 'redux-saga/effects';
import io from 'socket.io-client';
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

let i = 14;

const getNewId = () => {
  i++;

  return i;
};

export const loadSaga = () => {
  // console.log('Sagas!')

  const socket = io('ws://localhost:8080', {
    path: '/chart'
  });

  socket.on("message", (msg) => console.log(msg, ' !!!'));
};

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
  yield takeEvery(signIn, loginSaga)
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

export function* chartDataSaga() {
  yield delay(1200);

  yield put(setNewData({
    name: getNewId(),
    uv: getRandomArbitrary(1000, 4000),
    pv: getRandomArbitrary(6000, 10000),
    amt: getRandomArbitrary(2000, 3000),
  }));

  yield put(setData());
}

export function* watchChart() {
  yield takeEvery(setData, chartDataSaga)
}

export default function* rootSaga() {
  yield all([
    loadSaga(),
    watchLogin(),
    watchChart(),
  ])
}
