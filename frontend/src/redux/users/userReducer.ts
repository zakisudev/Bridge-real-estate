import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../interfaces/userInterface";

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUsers(state) {
      state.loading = true;
    },
    setUsers(state, action) {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    },
    getUsersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getUser(state) {
      state.error = null;
      state.loading = true;
    },
    getUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    addUser(state) {
      state.loading = true;
    },
    addUserSuccess(state, action) {
      state.users = [action.payload, ...state.users];
      state.loading = false;
      state.error = null;
    },
    addUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    updateUser(state) {
      state.loading = true;
    },
    updateUserSuccess(state, action) {
      state.users = state.users.map((u) =>
        u.id === action.payload?.id ? action.payload : u
      );
      state.loading = false;
      state.error = null;
    },
    updateUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteUser(state) {
      state.loading = true;
    },
    deleteUserSuccess(state, action) {
      state.users = state.users.filter((user) => user.id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
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
} = userSlice.actions;

export default userSlice.reducer;
