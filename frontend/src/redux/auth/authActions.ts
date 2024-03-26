import { UserLogin, UserRegister } from "../interfaces/userInterface";
import authTypes from "./authTypes";

export const registerUser = (user: UserRegister) => {
  return {
    type: authTypes.REGISTER_USER,
    payload: user,
  };
};

export const loginUser = (user: UserLogin) => {
  return {
    type: authTypes.LOGIN_USER,
    payload: user,
  };
};

export const logoutUser = () => {
  return {
    type: authTypes.LOGOUT_USER,
  };
};
