import { takeLatest, put, call } from "redux-saga/effects";
import PropertyActionType from "./propertyTypes";
import {
  PropertyModel,
  PropertyResponse,
} from "../interfaces/propertyInterface";
import {
  fetchProperties,
  fetchProperty,
  addProperty as ADD,
  updateProperty as UPDATE,
  deleteProperty as DELETE,
} from "../../services/api";
import {
  getProperties,
  getPropertiesFailed,
  setProperties,
  getProperty,
  getPropertyFailed,
  setProperty,
  addProperty,
  addPropertySuccess,
  addPropertyFailed,
  updateProperty,
  updatePropertySuccess,
  updatePropertyFailed,
  deleteProperty,
  deletePropertySuccess,
  deletePropertyFailed,
} from "./propertyReducer";

function* getPropertiesSaga(page: { type: string; payload: string }) {
  try {
    yield put(getProperties());
    const response: PropertyResponse = yield call(
      fetchProperties,
      page.payload
    );

    yield put(setProperties(response));
  } catch (error) {
    yield put(getPropertiesFailed(error));
  }
}

function* getPropertySaga(action: { type: string; payload: string }) {
  try {
    yield put(getProperty());
    const response: PropertyModel = yield call(fetchProperty, action.payload);
    yield put(setProperty(response));
  } catch (error) {
    yield put(getPropertyFailed(error));
  }
}

function* addPropertySaga(action: { type: string; payload: PropertyModel }) {
  try {
    yield put(addProperty());
    const response: PropertyResponse = yield call(ADD, action.payload);
    yield put(addPropertySuccess(response));
  } catch (error) {
    yield put(addPropertyFailed(error));
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* updatePropertySaga(action: any) {
  try {
    yield put(updateProperty());
    const response: PropertyResponse = yield call(UPDATE, action.payload);
    yield put(updatePropertySuccess(response));
  } catch (error) {
    yield put(updatePropertyFailed(error));
  }
}

function* deletePropertySaga(action: { type: string; payload: number }) {
  try {
    yield put(deleteProperty());
    const response: PropertyResponse = yield call(DELETE, action.payload);
    yield put(deletePropertySuccess(response));
  } catch (error) {
    yield put(deletePropertyFailed(error));
  }
}

export default function* watchPropertySaga() {
  yield takeLatest(PropertyActionType.GET_PROPERTIES, getPropertiesSaga);
  yield takeLatest(PropertyActionType.GET_PROPERTY, getPropertySaga);
  yield takeLatest(PropertyActionType.ADD_PROPERTY, addPropertySaga);
  yield takeLatest(PropertyActionType.UPDATE_PROPERTY, updatePropertySaga);
  yield takeLatest(PropertyActionType.DELETE_PROPERTY, deletePropertySaga);
}
