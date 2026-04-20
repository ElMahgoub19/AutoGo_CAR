// AutoGo - Auth Slice (Custom Backend OTP/JWT with mock fallback)
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api, { saveTokens, clearTokens } from '../../api/apiClient';
import type { User } from '../../types';
import { mockUser } from '../../data/mockData';

export interface AuthState {
  user: User | null;
  isOnboarded: boolean;
  isProfileComplete: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Start with mock user so the app always looks professional
const initialState: AuthState = {
  user: mockUser,
  isOnboarded: false,
  isProfileComplete: false,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Send OTP to phone
export const sendOTP = createAsyncThunk(
  'auth/sendOTP',
  async (phone: string, { rejectWithValue }) => {
    try {
      const res = await api.post('/auth/send-otp', { phone });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message || 'فشل إرسال رمز التحقق');
    }
  }
);

// Verify OTP and login
export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async ({ phone, otp }: { phone: string; otp: string }, { rejectWithValue }) => {
    try {
      const res = await api.post('/auth/verify-otp', { phone, otp });
      // Save tokens securely
      await saveTokens(res.data.accessToken, res.data.refreshToken);
      return res.data.user;
    } catch (err: any) {
      return rejectWithValue(err.message || 'رمز التحقق غير صحيح');
    }
  }
);

// Fetch current profile
export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/users/me');
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Update profile
export const updateProfileAsync = createAsyncThunk(
  'auth/updateProfile',
  async (data: Partial<User>, { rejectWithValue }) => {
    try {
      const res = await api.put('/users/me', data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Logout
export const logoutAsync = createAsyncThunk(
  'auth/logout',
  async () => {
    try { await api.post('/auth/logout'); } catch {}
    await clearTokens();
  }
);

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
      state.isAuthenticated = !!action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
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
  extraReducers: (builder) => {
    builder
      // Send OTP
      .addCase(sendOTP.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(sendOTP.fulfilled, (state) => { state.isLoading = false; })
      .addCase(sendOTP.rejected, (state, action) => { state.isLoading = false; state.error = action.payload as string; })
      // Verify OTP
      .addCase(verifyOTP.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isProfileComplete = true;
      })
      .addCase(verifyOTP.rejected, (state, action) => { state.isLoading = false; state.error = action.payload as string; })
      // Fetch profile
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      // Update profile
      .addCase(updateProfileAsync.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload } as User;
      })
      // Logout
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isProfileComplete = false;
      });
  },
});

export const {
  setOnboarded, setProfileComplete, updateProfile,
  setUser, logout, clearError, setLoading, setError,
} = authSlice.actions;
export default authSlice.reducer;
