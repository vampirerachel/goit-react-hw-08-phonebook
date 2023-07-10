import { createSlice } from "@reduxjs/toolkit";
import { authOperations } from './authOperations';

// Initial state
const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isFetchingCurrentUser: false,
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state) => {
      state.isFetchingCurrentUser = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authOperations.register.fulfilled, (state, action) => {
        // Update state when registration is successful
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isFetchingCurrentUser = false;
      })
      .addCase(authOperations.register.rejected, (state) => {
        // Update state when registration is rejected (error)
        state.isFetchingCurrentUser = false;
      })
      .addCase(authOperations.register.pending, (state) => {
        // Update state when registration is in progress
        state.isFetchingCurrentUser = true;
      })
      .addCase(authOperations.login.fulfilled, (state, action) => {
        // Update state when login is successful
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(authOperations.logOut.fulfilled, (state) => {
        // Update state when logout is successful
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(authOperations.fetchCurrentUser.pending, (state) => {
        // Update state when fetching current user is in progress
        state.isFetchingCurrentUser = true;
      })
      .addCase(authOperations.fetchCurrentUser.fulfilled, (state, action) => {
        // Update state when fetching current user is successful
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isFetchingCurrentUser = false;
      })
      .addCase(authOperations.fetchCurrentUser.rejected, (state) => {
        // Update state when fetching current user is rejected (error)
        state.isFetchingCurrentUser = false;
      });
  },
});

export const { register } = authSlice.actions;
export default authSlice.reducer;
