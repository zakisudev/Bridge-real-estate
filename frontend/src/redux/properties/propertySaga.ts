import { takeLatest, put, call } from "redux-saga/effects";
import PropertyActionType from "./propertyTypes";
import {
  PropertyModel,
  PropertiesResponse,
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
    const response: PropertiesResponse = yield call(
      fetchProperties,
      page.payload
    );

    if (response?.name === "AxiosError") {
      yield put(getPropertiesFailed(response?.message));
      return;
    }
    if (response) {
      yield put(setProperties(response));
      return;
    } else {
      yield put(getPropertiesFailed("No properties found"));
      return;
    }
  } catch (error) {
    yield put(getPropertiesFailed(error));
    return;
  }
}

function* getPropertySaga(action: { type: string; payload: string }) {
  try {
    yield put(getProperty());
    const response: PropertyResponse = yield call(
      fetchProperty,
      action.payload
    );
    if (response?.name === "AxiosError" || response?.success === false) {
      yield put(getPropertyFailed(response?.message));
      return;
    }
    if (response === null) {
      yield put(getPropertyFailed("No property found"));
      return;
    }
    if (response?.success) {
      yield put(setProperty(response?.property));
      return;
    }
  } catch (error) {
    yield put(getPropertyFailed(error));
    return;
  }
}

function* addPropertySaga(action: {
  type: string;
  payload: PropertyModel;
}): Generator<unknown, void, PropertyResponse> {
  try {
    yield put(addProperty());
    const response: PropertyResponse = yield call(ADD, action.payload);
    if (response?.name === "AxiosError" || response?.success === false) {
      yield put(addPropertyFailed(response?.message));
      return;
    }
    if (response?.success) {
      yield put(addPropertySuccess(response?.property));
      return;
    }
  } catch (error) {
    yield put(addPropertyFailed(error));
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* updatePropertySaga(action: any) {
  try {
    yield put(updateProperty());
    const response: PropertiesResponse = yield call(UPDATE, action.payload);
    yield put(updatePropertySuccess(response));
  } catch (error) {
    yield put(updatePropertyFailed(error));
  }
}

function* deletePropertySaga(action: { type: string; payload: number }) {
  try {
    yield put(deleteProperty());
    const response: PropertiesResponse = yield call(DELETE, action.payload);
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
