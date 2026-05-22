// AutoGo - Auth Slice (Mock Mode - يعمل بدون Backend)
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types';

export interface AuthState {
  user: User | null;
  isOnboarded: boolean;
  isProfileComplete: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isOnboarded: false,
  isProfileComplete: false,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// ═══════════════════════════════════════════
// بيانات المستخدم الافتراضية (Mock User)
// ═══════════════════════════════════════════
const createMockUser = (overrides: Partial<User> = {}): User => ({
  id: 'mock-user-' + Date.now(),
  name: 'أحمد محمد',
  phone: '+201234567890',
  email: 'ahmed@example.com',
  avatarUrl: undefined,
  city: 'القاهرة',
  membership: 'ذهبي',
  points: 2450,
  ...overrides,
} as User);

// ═══════════════════════════════════════════
// إرسال OTP صوري (Mock)
// ═══════════════════════════════════════════
export const sendOTP = createAsyncThunk(
  'auth/sendOTP',
  async (phone: string, { rejectWithValue }) => {
    try {
      // محاكاة تأخير الشبكة
      await new Promise(resolve => setTimeout(resolve, 800));
      console.log(`[AutoGo Mock] OTP sent to ${phone} (any 4-digit code will work)`);
      return { success: true, phone };
    } catch (err: any) {
      return rejectWithValue('فشل إرسال رمز التحقق');
    }
  }
);

// ═══════════════════════════════════════════
// التحقق من OTP صوري (Mock) - أي رمز 4 أرقام مقبول
// ═══════════════════════════════════════════
export const mockVerifyOTP = createAsyncThunk(
  'auth/mockVerifyOTP',
  async ({ phone, otp }: { phone: string; otp: string }, { rejectWithValue }) => {
    try {
      // محاكاة تأخير الشبكة
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (otp.length !== 4) {
        return rejectWithValue('الرمز يجب أن يكون 4 أرقام');
      }
      
      console.log(`[AutoGo Mock] OTP verified for ${phone}`);
      
      // إرجاع بيانات مستخدم وهمية
      return createMockUser({ phone });
    } catch (err: any) {
      return rejectWithValue('حدث خطأ في التحقق');
    }
  }
);

// ═══════════════════════════════════════════
// تسجيل دخول اجتماعي صوري (Google / Apple)
// ═══════════════════════════════════════════
export const mockSocialLogin = createAsyncThunk(
  'auth/mockSocialLogin',
  async (data: { provider: string; name: string; email: string; avatarUrl?: string }, { rejectWithValue }) => {
    try {
      // محاكاة تأخير الشبكة
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      console.log(`[AutoGo Mock] ${data.provider} login successful`);
      
      return createMockUser({
        name: data.name,
        email: data.email,
        avatarUrl: data.avatarUrl,
      });
    } catch (err: any) {
      return rejectWithValue(`فشل تسجيل الدخول بـ ${data.provider}`);
    }
  }
);

// ═══════════════════════════════════════════
// تحديث الملف الشخصي (صوري)
// ═══════════════════════════════════════════
export const updateProfileAsync = createAsyncThunk(
  'auth/updateProfile',
  async (data: Partial<User>, { getState, rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return data;
    } catch (err: any) {
      return rejectWithValue('فشل تحديث الملف الشخصي');
    }
  }
);

// ═══════════════════════════════════════════
// تحديث الصورة الشخصية (صوري)
// ═══════════════════════════════════════════
export const updateAvatarAsync = createAsyncThunk(
  'auth/updateAvatar',
  async (avatarUrl: string, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { avatarUrl };
    } catch (err: any) {
      return rejectWithValue('فشل تحديث الصورة');
    }
  }
);

// ═══════════════════════════════════════════
// جلب الملف الشخصي (صوري)
// ═══════════════════════════════════════════
export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const state = getState() as { auth: AuthState };
      return state.auth.user;
    } catch (err: any) {
      return rejectWithValue('فشل جلب الملف الشخصي');
    }
  }
);

// ═══════════════════════════════════════════
// تسجيل الخروج
// ═══════════════════════════════════════════
export const logoutAsync = createAsyncThunk(
  'auth/logout',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log('[AutoGo Mock] User logged out');
  }
);

// ═══════════════════════════════════════════
// Slice
// ═══════════════════════════════════════════
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
      // Send OTP (mock)
      .addCase(sendOTP.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(sendOTP.fulfilled, (state) => { state.isLoading = false; })
      .addCase(sendOTP.rejected, (state, action) => { state.isLoading = false; state.error = action.payload as string; })
      // Mock Verify OTP
      .addCase(mockVerifyOTP.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(mockVerifyOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isProfileComplete = true;
      })
      .addCase(mockVerifyOTP.rejected, (state, action) => { state.isLoading = false; state.error = action.payload as string; })
      // Mock Social Login
      .addCase(mockSocialLogin.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(mockSocialLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isProfileComplete = true;
      })
      .addCase(mockSocialLogin.rejected, (state, action) => { state.isLoading = false; state.error = action.payload as string; })
      // Fetch profile
      .addCase(fetchProfile.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload as User;
          state.isAuthenticated = true;
        }
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
      })
      // Update Avatar
      .addCase(updateAvatarAsync.fulfilled, (state, action) => {
        if (state.user) {
          state.user = { ...state.user, ...action.payload };
        }
      });
  },
});

export const {
  setOnboarded, setProfileComplete, updateProfile,
  setUser, logout, clearError, setLoading, setError,
} = authSlice.actions;
export default authSlice.reducer;
