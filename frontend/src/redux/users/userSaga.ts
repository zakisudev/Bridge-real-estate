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
  setUser,
  addUserSuccess,
  addUserFailure,
  updateUser,
  updateUserSuccess,
  updateUserFailure,
  deleteUser,
  deleteUserSuccess,
  deleteUserFailure,
  resetAll,
} from "./userReducer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* fetchUsersSaga(): any {
  try {
    yield put(getUsers());
    const users = yield call(fetchUsers);
    if (users?.name === "AxiosError" || users?.success === false) {
      yield put(getUserFailure("Error fetching users"));
      return;
    } else if (users?.length !== 0) {
      yield put(setUsers(users));
    } else {
      yield put(getUserFailure("users not found"));
    }
  } catch (error) {
    yield put(getUsersFailure(error));
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* fetchUserSaga(action: any) {
  try {
    yield put(getUser());
    const user: UserModelResponse = yield call(fetchUser, action.payload);
    if (user?.id) {
      yield put(setUser(user));
    }
    yield put(resetAll());
  } catch (error) {
    yield put(getUserFailure(error));
    yield put(resetAll());
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* addUserSaga(user: any) {
  try {
    yield put(addUser());
    const newUser: UserModelResponse = yield call(ADD, user);
    yield put(addUserSuccess(newUser));
    yield put(resetAll());
  } catch (error) {
    yield put(addUserFailure(error));
    yield put(resetAll());
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* updateUserSaga(user: any) {
  try {
    yield put(updateUser());
    const updatedUser: UserModelResponse = yield call(UPDATE, user.payload);
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
