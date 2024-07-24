// src/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../models';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | undefined | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null
};

interface actionLogin {
  token: string | null,
  user: User | null;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state, action: PayloadAction<actionLogin>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
