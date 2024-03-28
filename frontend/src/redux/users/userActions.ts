import { UserRegister } from "../interfaces/userInterface";
import userTypes from "./userTypes";

export const getUsers = () => {
  return {
    type: userTypes.GET_USERS,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUser = (id: string, callback: any) => {
  return {
    type: userTypes.GET_USER,
    payload: id,
    callback,
  };
};

export const addUser = (user: UserRegister) => {
  return {
    type: userTypes.ADD_USER,
    payload: user,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateUser = (user: any) => {
  return {
    type: userTypes.UPDATE_USER,
    payload: user,
  };
};

export const deleteUser = (id: number) => {
  return {
    type: userTypes.DELETE_USER,
    payload: id,
  };
};

export const getUserProfile = () => {
  return {
    type: userTypes.GET_USER_PROFILE,
  };
};

export const updateUserProfile = (user: UserRegister) => {
  return {
    type: userTypes.UPDATE_USER_PROFILE,
    payload: user,
  };
};

export const deleteUserProfile = () => {
  return {
    type: userTypes.DELETE_USER_PROFILE,
  };
};
