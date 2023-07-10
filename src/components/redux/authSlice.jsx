import { createSlice } from "@reduxjs/toolkit";
import { authOperations } from './authOperations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isFetchingCurrentUser: false,
};


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
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isFetchingCurrentUser = false;
      })
      .addCase(authOperations.register.rejected, (state) => {
        state.isFetchingCurrentUser = false;
      })
      .addCase(authOperations.register.pending, (state) => {
        state.isFetchingCurrentUser = true;
      })
      .addCase(authOperations.login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(authOperations.logOut.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(authOperations.fetchCurrentUser.pending, (state) => {
        state.isFetchingCurrentUser = true;
      })
      .addCase(authOperations.fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isFetchingCurrentUser = false;
      })
      .addCase(authOperations.fetchCurrentUser.rejected, (state) => {
        state.isFetchingCurrentUser = false;
      });
  },
});

export const { register } = authSlice.actions;
export default authSlice.reducer;
