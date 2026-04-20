// AutoGo - Orders Slice (API-connected with mock fallback)
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../api/apiClient';
import type { Order, HistoryOrder, OrdersState } from '../../types';
import { mockOrders, mockHistory } from '../../data/mockData';

// Request tow (SOS)
export const requestTow = createAsyncThunk(
  'orders/requestTow',
  async (orderData: { latitude?: number; longitude?: number; address?: string; carId?: string; notes?: string }, { rejectWithValue }) => {
    try {
      const res = await api.post('/orders/tow', orderData);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Book service (maintenance)
export const bookService = createAsyncThunk(
  'orders/bookService',
  async (bookingData: { serviceId?: string; workshopId?: string; carId?: string; date?: string; time?: string; serviceMethod?: string; notes?: string }, { rejectWithValue }) => {
    try {
      const res = await api.post('/orders/booking', bookingData);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Fetch active orders
export const fetchActiveOrders = createAsyncThunk(
  'orders/fetchActive',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/orders/active');
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Fetch order history
export const fetchOrderHistory = createAsyncThunk(
  'orders/fetchHistory',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/orders/history');
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Cancel order
export const cancelOrderAsync = createAsyncThunk(
  'orders/cancel',
  async (orderId: string, { rejectWithValue }) => {
    try {
      await api.patch(`/orders/${orderId}/cancel`);
      return orderId;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Rate order
export const rateOrderAsync = createAsyncThunk(
  'orders/rate',
  async ({ orderId, score, comment }: { orderId: string; score: number; comment?: string }, { rejectWithValue }) => {
    try {
      const res = await api.post(`/orders/${orderId}/rate`, { score, comment });
      return { orderId, rating: res.data };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Start with mock data so the app always looks professional
const initialState: OrdersState = {
  activeOrders: mockOrders,
  history: mockHistory,
  currentOrder: null,
  isSearching: false,
  driverFound: false,
  isLoading: false,
  trackingData: {
    driverLocation: { lat: 30.0444, lng: 31.2357 },
    eta: 7,
    distance: 3.2,
    status: 'في الطريق إليك',
    steps: [
      { label: 'تم تأكيد الطلب', time: '10:42 صباحاً', done: true },
      { label: 'تم إرسال الونش', time: '10:45 صباحاً', done: true },
      { label: 'في الطريق إليك', time: '10:52 صباحاً', done: false, active: true },
      { label: 'الوصول للموقع', time: null, done: false },
    ],
  },
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setCurrentOrder: (state, action: PayloadAction<Order | null>) => {
      state.currentOrder = action.payload;
    },
    updateOrderStatus: (state, action: PayloadAction<{ id: string; status: string }>) => {
      const { id, status } = action.payload;
      const order = state.activeOrders.find(o => o.id === id);
      if (order) order.status = status;
    },
    cancelOrder: (state, action: PayloadAction<string>) => {
      state.activeOrders = state.activeOrders.filter(o => o.id !== action.payload);
      if (state.currentOrder?.id === action.payload) state.currentOrder = null;
      state.isSearching = false;
      state.driverFound = false;
    },
    startSearching: (state) => {
      state.isSearching = true;
      state.driverFound = false;
    },
    driverAccepted: (state) => {
      state.isSearching = false;
      state.driverFound = true;
    },
    completeOrder: (state, action: PayloadAction<string>) => {
      const order = state.activeOrders.find(o => o.id === action.payload);
      if (order) {
        order.status = 'مكتمل';
        state.history.unshift({ ...order, status: 'مكتمل', price: 0, month: '' } as HistoryOrder);
        state.activeOrders = state.activeOrders.filter(o => o.id !== action.payload);
      }
    },
    rateOrder: (state, action: PayloadAction<{ orderId: string; rating: number; comment: string }>) => {
      const { orderId, rating, comment } = action.payload;
      const historyItem = state.history.find(o => o.id === orderId);
      if (historyItem) {
        historyItem.rating = rating;
        historyItem.comment = comment;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Request Tow
      .addCase(requestTow.pending, (state) => { state.isLoading = true; state.isSearching = true; })
      .addCase(requestTow.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSearching = false;
        state.driverFound = true;
        state.currentOrder = action.payload;
        state.activeOrders.unshift(action.payload);
      })
      .addCase(requestTow.rejected, (state) => { state.isLoading = false; state.isSearching = false; })
      // Book Service
      .addCase(bookService.pending, (state) => { state.isLoading = true; })
      .addCase(bookService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
        state.activeOrders.unshift(action.payload);
      })
      .addCase(bookService.rejected, (state) => { state.isLoading = false; })
      // Fetch Active
      .addCase(fetchActiveOrders.fulfilled, (state, action) => {
        // Only replace if API returned data, otherwise keep mock data
        if (action.payload && action.payload.length > 0) {
          state.activeOrders = action.payload;
        }
      })
      // Fetch History
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        // Only replace if API returned data, otherwise keep mock data
        if (action.payload && action.payload.length > 0) {
          state.history = action.payload;
        }
      })
      // Cancel
      .addCase(cancelOrderAsync.fulfilled, (state, action) => {
        state.activeOrders = state.activeOrders.filter(o => o.id !== action.payload);
        if (state.currentOrder?.id === action.payload) state.currentOrder = null;
      });
  },
});

export const {
  setCurrentOrder, updateOrderStatus, cancelOrder,
  startSearching, driverAccepted, completeOrder, rateOrder,
} = ordersSlice.actions;
export default ordersSlice.reducer;
