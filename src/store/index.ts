// AutoGo - Redux Store
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import garageReducer from './slices/garageSlice';
import ordersReducer from './slices/ordersSlice';
import servicesReducer from './slices/servicesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    garage: garageReducer,
    orders: ordersReducer,
    services: servicesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
