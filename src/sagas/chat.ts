import { put, takeEvery, select } from 'redux-saga/effects';

import {
  sendMessage,
  sendMessageToSocket,
  setText,
} from '../actions/chat';

export function* sendMessageSaga() {
  const name = yield select(state => state.loginReducer.login);
  const text = yield select(state => state.chatReducer.text);

  if (text) {
    yield put(sendMessageToSocket({ name, text }));
    yield put(setText(''));
  }
}

export default function* watchChat() {
  yield takeEvery(sendMessage, sendMessageSaga);
}
