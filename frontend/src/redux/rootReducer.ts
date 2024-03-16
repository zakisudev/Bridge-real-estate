// reducers.ts
import { combineReducers } from 'redux';
import { useDispatch } from 'react-redux';
import { all } from 'redux-saga/effects';
import userReducer from './users/userReducer';
import { watchUserSaga } from './sagas';

const rootReducer = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield all([watchUserSaga()]);
}

export type AppDispatch = typeof useDispatch;

export default rootReducer;
