import { all } from 'redux-saga/effects';

import watchLogin from './login';
import watchChat from './chat';

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchChat(),
  ]);
}
