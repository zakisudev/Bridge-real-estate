import { all, fork } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([fork(userSaga), fork(propertySaga), fork(authSaga)]);
}
