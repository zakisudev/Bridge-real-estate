import { takeLatest, put, call } from "redux-saga/effects";
import AuthActionType from "./authTypes";
import { UserRegister } from "../interfaces/userInterface";
import { AuthResponse } from "../interfaces/authInterface";
import {
  registerUser as REGISTER,
  loginUser as LOGIN,
  logout as LOGOUT,
} from "../../services/api";
import {
  registerUser,
  registerUserSuccess,
  registerUserFailure,
  loginUser,
  loginUserSuccess,
  loginUserFailure,
  logoutUser,
  logoutUserError,
} from "./authReducer";

function* registerUserSaga(action: { type: string; payload: UserRegister }) {
  try {
    yield put(registerUser());
    const response: AuthResponse = yield call(REGISTER, action.payload);
    yield put(registerUserSuccess(response));
  } catch (error) {
    yield put(registerUserFailure(error));
  }
}

function* loginUserSaga(action: { type: string; payload: UserRegister }) {
  try {
    yield put(loginUser());
    const response: AuthResponse = yield call(LOGIN, action.payload);
    yield put(loginUserSuccess(response));
  } catch (error) {
    yield put(loginUserFailure(error));
  }
}

function* logoutUserSaga() {
  try {
    yield call(LOGOUT);
    yield put(logoutUser());
  } catch (error) {
    yield put(logoutUserError(error));
  }
}

export default function* watchAuthSaga() {
  yield takeLatest(AuthActionType.REGISTER_USER, registerUserSaga);
  yield takeLatest(AuthActionType.LOGIN_USER, loginUserSaga);
  yield takeLatest(AuthActionType.LOGOUT_USER, logoutUserSaga);
}
