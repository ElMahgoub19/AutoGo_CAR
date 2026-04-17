// AutoGo - Orders Slice
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { mockOrders, mockHistory, mockDriver } from '../../data/mockData';
import type { Order, HistoryOrder, OrdersState } from '../../types';

export const requestTow = createAsyncThunk(
  'orders/requestTow',
  async (orderData: Partial<Order>) => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    return {
      id: `SOS-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'ونش',
      title: 'طلب ونش طوارئ',
      status: 'في الطريق إليك',
      statusColor: '#2DD4BF',
      driver: mockDriver,
      ...orderData,
      createdAt: new Date().toISOString(),
      icon: 'truck',
    } as Order;
  }
);

export const bookService = createAsyncThunk(
  'orders/bookService',
  async (bookingData: Partial<Order> & { serviceName?: string }) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      id: `MNT-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'صيانة',
      title: bookingData.serviceName || 'صيانة دورية',
      status: 'بانتظار التأكيد',
      statusColor: '#D69E2E',
      ...bookingData,
      createdAt: new Date().toISOString(),
      icon: 'build',
    } as Order;
  }
);

const initialState: OrdersState = {
  activeOrders: mockOrders,
  history: mockHistory,
  currentOrder: null,
  isSearching: false,
  driverFound: false,
  isLoading: false,
  trackingData: {
    driverLocation: { lat: 24.7336, lng: 46.6553 },
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
      .addCase(requestTow.pending, (state) => { state.isLoading = true; state.isSearching = true; })
      .addCase(requestTow.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSearching = false;
        state.driverFound = true;
        state.currentOrder = action.payload;
        state.activeOrders.unshift(action.payload);
      })
      .addCase(bookService.pending, (state) => { state.isLoading = true; })
      .addCase(bookService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
        state.activeOrders.unshift(action.payload);
      });
  },
});

export const {
  setCurrentOrder, updateOrderStatus, cancelOrder,
  startSearching, driverAccepted, completeOrder, rateOrder,
} = ordersSlice.actions;
export default ordersSlice.reducer;
