import { all } from "redux-saga/effects";
import watchUserSaga from "./users/userSaga";
import watchPropertySaga from "./properties/propertySaga";
import watchAuthSaga from "./auth/authSaga";

export default function* rootSaga() {
  yield all([watchUserSaga(), watchPropertySaga(), watchAuthSaga()]);
}
