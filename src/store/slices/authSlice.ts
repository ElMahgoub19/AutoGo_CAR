// AutoGo - Auth Slice (API-connected with mock fallback)
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../api/apiClient';
import { saveTokens } from '../../api/apiClient';
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

// ─── Map backend user to app User type ────────────────────────────────────────
const mapUser = (userData: any, overrides?: Partial<User>): User => ({
  id: userData.id,
  name: userData.name || 'مستخدم',
  phone: userData.phone || '',
  email: userData.email || '',
  avatarUrl: userData.avatarUrl,
  city: userData.city || 'القاهرة',
  membership: userData.membershipType || 'عادي',
  points: userData.points || 0,
  ...overrides,
} as User);

// ═══════════════════════════════════════════
// إرسال OTP - calls backend
// ═══════════════════════════════════════════
export const sendOTP = createAsyncThunk(
  'auth/sendOTP',
  async (phone: string, { rejectWithValue }) => {
    try {
      await api.post('/auth/send-otp', { phone });
      return { success: true, phone };
    } catch (err: any) {
      // In dev mode, ignore send errors (SMS may not be configured)
      console.log('[AutoGo] OTP send (dev mode - continuing):', err?.message);
      return { success: true, phone };
    }
  }
);

// ═══════════════════════════════════════════
// التحقق من OTP - calls backend, saves token
// ═══════════════════════════════════════════
export const mockVerifyOTP = createAsyncThunk(
  'auth/mockVerifyOTP',
  async ({ phone, otp }: { phone: string; otp: string }, { rejectWithValue }) => {
    try {
      const res = await api.post('/auth/verify-otp', { phone, otp });
      // Save token for future API calls
      if (res.data.accessToken) {
        await saveTokens(res.data.accessToken, res.data.refreshToken || '');
      }
      return mapUser(res.data.user);
    } catch (err: any) {
      console.log('[AutoGo] Backend OTP failed, using mock fallback');
      // Mock fallback - any 4-digit code accepted
      if (otp.length === 4) {
        return {
          id: 'mock-user-' + Date.now(),
          name: 'مستخدم',
          phone,
          email: '',
          avatarUrl: undefined,
          city: 'القاهرة',
          membership: 'عادي',
          points: 0,
        } as User;
      }
      return rejectWithValue('رمز غير صحيح');
    }
  }
);

// ═══════════════════════════════════════════
// تسجيل دخول اجتماعي - Apple / Google
// uses /auth/clerk-sync endpoint
// ═══════════════════════════════════════════
export const mockSocialLogin = createAsyncThunk(
  'auth/mockSocialLogin',
  async (data: { provider: string; name: string; email: string; avatarUrl?: string }, { rejectWithValue }) => {
    try {
      const res = await api.post('/auth/clerk-sync', {
        email: data.email,
        name: data.name,
        avatarUrl: data.avatarUrl,
        provider: data.provider,
      });
      // Save token
      if (res.data.accessToken) {
        await saveTokens(res.data.accessToken, res.data.refreshToken || '');
      }
      return mapUser(res.data.user);
    } catch (err: any) {
      console.log(`[AutoGo] Social login backend failed, using mock:`, err?.message);
      // Mock fallback
      return {
        id: 'social-' + Date.now(),
        name: data.name,
        phone: '',
        email: data.email,
        avatarUrl: data.avatarUrl,
        city: 'القاهرة',
        membership: 'عادي',
        points: 0,
      } as User;
    }
  }
);

// ═══════════════════════════════════════════
// تحديث الملف الشخصي
// ═══════════════════════════════════════════
export const updateProfileAsync = createAsyncThunk(
  'auth/updateProfile',
  async (data: Partial<User>, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return data;
    } catch (err: any) {
      return rejectWithValue('فشل تحديث الملف الشخصي');
    }
  }
);

// ═══════════════════════════════════════════
// تحديث الصورة الشخصية
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
// جلب الملف الشخصي
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
    console.log('[AutoGo] User logged out');
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
      // Send OTP
      .addCase(sendOTP.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(sendOTP.fulfilled, (state) => { state.isLoading = false; })
      .addCase(sendOTP.rejected, (state, action) => { state.isLoading = false; state.error = action.payload as string; })
      // Verify OTP
      .addCase(mockVerifyOTP.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(mockVerifyOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isProfileComplete = true;
      })
      .addCase(mockVerifyOTP.rejected, (state, action) => { state.isLoading = false; state.error = action.payload as string; })
      // Social Login
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
