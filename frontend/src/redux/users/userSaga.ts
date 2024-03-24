import { takeLatest, put, call } from "redux-saga/effects";
import userActionTypes from "./userTypes";
import {
  fetchUsers,
  fetchUser,
  addUser as ADD,
  updateUser as UPDATE,
  deleteUser as DELETE,
} from "../../services/api";
import { UserModelResponse } from "./../interfaces/userInterface";
import {
  getUsers,
  setUsers,
  getUsersFailure,
  getUser,
  getUserFailure,
  addUser,
  addUserSuccess,
  addUserFailure,
  updateUser,
  updateUserSuccess,
  updateUserFailure,
  deleteUser,
  deleteUserSuccess,
  deleteUserFailure,
} from "./userReducer";

function* fetchUsersSaga() {
  try {
    yield put(getUsers());
    const users: UserModelResponse[] = yield call(fetchUsers);
    yield put(setUsers(users));
  } catch (error) {
    yield put(getUsersFailure(error));
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* fetchUserSaga(action: any) {
  try {
    yield put(getUser());
    const user: UserModelResponse = yield call(fetchUser, action.payload);

    if (action.callback && typeof action.callback === "function") {
      action.callback(user);
    }
  } catch (error) {
    yield put(getUserFailure(error));
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* addUserSaga(user: any) {
  try {
    yield put(addUser());
    const newUser: UserModelResponse = yield call(ADD, user);
    yield put(addUserSuccess(newUser));
  } catch (error) {
    yield put(addUserFailure(error));
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* updateUserSaga(data: any) {
  try {
    yield put(updateUser());
    const updatedUser: UserModelResponse = yield call(
      UPDATE,
      data.id,
      data.user
    );
    yield put(updateUserSuccess(updatedUser));
  } catch (error) {
    yield put(updateUserFailure(error));
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* deleteUserSaga(id: any) {
  try {
    yield put(deleteUser());
    yield call(DELETE, id);
    yield put(deleteUserSuccess(id));
  } catch (error) {
    yield put(deleteUserFailure(error));
  }
}

export default function* watchUserSaga() {
  yield takeLatest(userActionTypes.GET_USERS, fetchUsersSaga);
  yield takeLatest(userActionTypes.GET_USER, fetchUserSaga);
  yield takeLatest(userActionTypes.ADD_USER, addUserSaga);
  yield takeLatest(userActionTypes.UPDATE_USER, updateUserSaga);
  yield takeLatest(userActionTypes.DELETE_USER, deleteUserSaga);
}
