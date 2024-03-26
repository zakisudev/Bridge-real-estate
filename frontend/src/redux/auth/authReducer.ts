import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../interfaces/authInterface";

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser(state) {
      state.loading = true;
      state.error = null;
    },
    registerUserSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.user = action.payload;
    },
    registerUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload.message;
    },

    loginUser(state) {
      state.loading = true;
      state.error = null;
    },
    loginUserSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.user = action.payload;
    },
    loginUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    logoutUser(state) {
      state.user = null;
      localStorage.clear();
    },

    logoutUserError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  registerUser,
  registerUserSuccess,
  registerUserFailure,
  loginUser,
  loginUserSuccess,
  loginUserFailure,
  logoutUser,
  logoutUserError,
} = authSlice.actions;

export default authSlice.reducer;
