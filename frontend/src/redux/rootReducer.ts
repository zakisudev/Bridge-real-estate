import { combineReducers } from "redux";
import { useDispatch } from "react-redux";
import authReducer from "./auth/authReducer";
import userReducer from "./users/userReducer";
import propertyReducer from "./properties/propertyReducer";

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  property: propertyReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof useDispatch;

export default rootReducer;
