import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Notify } from "notiflix/build/notiflix-notify-aio";

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

// Token management
 export const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post('/users/signup', credentials);
      Notify.success("You're registered ;)");
      return data;
    } catch (error) {
      if (
        error.response &&
        error.response.data.message === 'Email already exists.'
      ) {
        Notify.failure('Email already exists. Please use a different email.');
        return thunkAPI.rejectWithValue(
          'Email already exists. Please use a different email.'
        );
      } else {
        Notify.failure('Something went wrong on register');
        return thunkAPI.rejectWithValue('Something went wrong on register');
      }
    }
  }
);



// Login operation
export const login = createAsyncThunk('authlogin', async (credentials, thunkAPI) => {
  try {
    const { data } = await axios.post('/users/login', credentials);
    Notify.success("You're logged in ;)");
    token.set(data.token); // Set the token in Axios headers
    return data;
  } catch (error) {
    Notify.failure('Something went wrong on login');
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

// Logout operation
export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const authToken = thunkAPI.getState().auth.token;
    await axios.post('users/logout', null, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    Notify.success("You're logged out. Have a good day ;)");
    token.unset(); // Clear the token from Axios headers
  } catch (error) {
    Notify.failure('Something went wrong on logout');
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

// Fetch current user operation
export const fetchCurrentUser = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (persistedToken === null) {
    console.log('No token from fetchCurrentUser');
    return thunkAPI.rejectWithValue();
  }

  token.set(persistedToken); // Set the token in Axios headers
  try {
  const { data } = await axios.get('/users/current');
    return data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

// Object containing all authentication operations
export const authOperations = {
  register,
  login,
  logOut,
  fetchCurrentUser,
};


