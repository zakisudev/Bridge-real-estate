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
      state.error = null;
      state.loading = true;
    },
    registerUserSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem("token", action.payload.token);
    },
    registerUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      localStorage.removeItem("token");
    },

    loginUser(state) {
      state.loading = true;
    },
    loginUserSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
    },
    loginUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    logoutUser(state) {
      state.user = null;
      localStorage.removeItem("token");
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
