import { takeLatest, put, call } from "redux-saga/effects";
import AuthActionType from "./authTypes";
import { UserRegister } from "../interfaces/userInterface";
import { AuthResponse, RegisterResponse } from "../interfaces/authInterface";
import {
  registerUser as REGISTER,
  loginUser as LOGIN,
  logout as LOGOUT,
  deleteUser as DELETE,
} from "../../services/api";
import {
  registerUserSuccess,
  registerUserFailure,
  loginUser,
  loginUserSuccess,
  loginUserFailure,
  logoutUser,
  logoutUserError,
  registerUser,
} from "./authReducer";

function* registerUserSaga(action: { type: string; payload: UserRegister }) {
  try {
    yield put(registerUser());
    const user: RegisterResponse = yield call(REGISTER, action.payload);

    if (user?.name === "AxiosError") {
      yield put(registerUserFailure(user.response.data));
      return;
    }
    if (user?.success) yield put(registerUserSuccess());
  } catch (error) {
    yield put(registerUserFailure(error));
  }
}

function* loginUserSaga(action: { type: string; payload: UserRegister }) {
  try {
    yield put(loginUser());
    const auth: AuthResponse = yield call(LOGIN, action.payload);

    if (auth?.name === "AxiosError") {
      yield put(loginUserFailure(auth.response?.data?.message));
      return;
    }
    yield put(loginUserSuccess(auth));
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* deleteUserAccount(action: any) {
  try {
    yield call(DELETE, action.payload);
    yield put(logoutUser());
  } catch (error) {
    yield put(logoutUserError(error));
  }
}

export default function* watchAuthSaga() {
  yield takeLatest(AuthActionType.REGISTER_USER, registerUserSaga);
  yield takeLatest(AuthActionType.LOGIN_USER, loginUserSaga);
  yield takeLatest(AuthActionType.LOGOUT_USER, logoutUserSaga);
  yield takeLatest(AuthActionType.DELETE_USER, deleteUserAccount);
}
