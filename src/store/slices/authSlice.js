// AutoGo - Auth Slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockUser } from '../../data/mockData';

export const loginWithPhone = createAsyncThunk('auth/loginWithPhone', async (phone, { rejectWithValue }) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { phone, otpSent: true };
  } catch (err) {
    return rejectWithValue('خطأ في إرسال الرمز');
  }
});

export const verifyOTP = createAsyncThunk('auth/verifyOTP', async ({ phone, otp }, { rejectWithValue }) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (otp === '1234' || otp.length === 4) {
      return { user: mockUser, token: 'mock_token_123' };
    }
    return rejectWithValue('رمز التحقق غير صحيح');
  } catch (err) {
    return rejectWithValue('خطأ في التحقق');
  }
});

export const signUpWithPhone = createAsyncThunk('auth/signUpWithPhone', async ({ name, phone, email }, { rejectWithValue }) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1200));
    return { phone, name, email, otpSent: true };
  } catch (err) {
    return rejectWithValue('خطأ في إنشاء الحساب');
  }
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async ({ method, value }, { rejectWithValue }) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { method, value, sent: true };
  } catch (err) {
    return rejectWithValue('خطأ في إرسال رابط الاسترداد');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    isOnboarded: false,
    isProfileComplete: false,
    otpSent: false,
    phone: '',
    error: null,
  },
  reducers: {
    setOnboarded: (state) => {
      state.isOnboarded = true;
    },
    setProfileComplete: (state, action) => {
      state.isProfileComplete = true;
      state.user = { ...state.user, ...action.payload };
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isProfileComplete = false;
      state.otpSent = false;
      state.phone = '';
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithPhone.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(loginWithPhone.fulfilled, (state, action) => {
        state.isLoading = false;
        state.otpSent = true;
        state.phone = action.payload.phone;
      })
      .addCase(loginWithPhone.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(verifyOTP.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Sign up
      .addCase(signUpWithPhone.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(signUpWithPhone.fulfilled, (state, action) => {
        state.isLoading = false;
        state.otpSent = true;
        state.phone = action.payload.phone;
      })
      .addCase(signUpWithPhone.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Reset password
      .addCase(resetPassword.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setOnboarded, setProfileComplete, updateProfile, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
