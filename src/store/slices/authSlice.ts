// AutoGo - Auth Slice (Clerk-integrated)
// Clerk handles authentication state (signIn, signUp, session).
// This slice manages only app-level auth preferences (onboarding, profile completion).
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types';

export interface AuthState {
  user: User | null;
  isOnboarded: boolean;
  isProfileComplete: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isOnboarded: false,
  isProfileComplete: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setOnboarded: (state) => {
      state.isOnboarded = true;
    },
    setProfileComplete: (state, action: PayloadAction<Partial<User>>) => {
      state.isProfileComplete = true;
      state.user = { ...state.user, ...action.payload } as User;
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      state.user = { ...state.user, ...action.payload } as User;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isProfileComplete = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setOnboarded,
  setProfileComplete,
  updateProfile,
  setUser,
  logout,
  clearError,
  setLoading,
  setError,
} = authSlice.actions;
export default authSlice.reducer;
