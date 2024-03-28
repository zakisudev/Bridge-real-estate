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
    registerUserSuccess(state) {
      state.error = null;
      state.loading = false;
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
      localStorage.setItem("token", JSON.stringify(action.payload.token));
    },
    loginUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    logoutUser(state) {
      state.user = null;
      state.loading = false;
      localStorage.clear();
    },

    logoutUserError(state, action) {
      state.error = action.payload;
      state.loading = false;
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
