// AutoGo - Redux Store
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import garageReducer from './slices/garageSlice';
import ordersReducer from './slices/ordersSlice';
import servicesReducer from './slices/servicesSlice';
import addressReducer from './slices/addressSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    garage: garageReducer,
    orders: ordersReducer,
    services: servicesReducer,
    address: addressReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
