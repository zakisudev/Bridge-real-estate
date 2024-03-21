// reducers.ts
import { combineReducers } from 'redux';
import userReducer from './users/userReducer';
import propertyReducer from './property/propertyReducer';
import authReducer from './auth/authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  property: propertyReducer,
});

export default rootReducer;
