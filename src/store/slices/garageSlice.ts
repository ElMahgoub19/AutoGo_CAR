// AutoGo - Garage Slice (API-connected with mock fallback)
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../api/apiClient';
import type { Car, GarageState } from '../../types';
import { mockCars } from '../../data/mockData';

// Fetch user's cars from API
export const fetchCars = createAsyncThunk(
  'garage/fetchCars',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/cars');
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Add car via API
export const addCarAsync = createAsyncThunk(
  'garage/addCar',
  async (carData: { brand: string; model: string; year: number; plate: string; color?: string; mileage?: number }, { rejectWithValue }) => {
    try {
      const res = await api.post('/cars', carData);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Delete car via API
export const deleteCarAsync = createAsyncThunk(
  'garage/deleteCar',
  async (carId: string, { rejectWithValue }) => {
    try {
      await api.delete(`/cars/${carId}`);
      return carId;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Start with mock data so the app always looks professional
const initialState: GarageState = {
  cars: mockCars,
  activeCar: mockCars[0] || null,
  isLoading: false,
};

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    addCar: (state, action: PayloadAction<Omit<Car, 'id' | 'status' | 'reminders'>>) => {
      const newCar: Car = { ...action.payload, id: `car_${Date.now()}`, status: 'نشط', reminders: [] };
      state.cars.push(newCar);
      if (!state.activeCar) state.activeCar = newCar;
    },
    updateCar: (state, action: PayloadAction<Partial<Car> & { id: string }>) => {
      const idx = state.cars.findIndex(c => c.id === action.payload.id);
      if (idx >= 0) {
        state.cars[idx] = { ...state.cars[idx], ...action.payload };
        if (state.activeCar?.id === action.payload.id) {
          state.activeCar = state.cars[idx];
        }
      }
    },
    deleteCar: (state, action: PayloadAction<string>) => {
      state.cars = state.cars.filter(c => c.id !== action.payload);
      if (state.activeCar?.id === action.payload) {
        state.activeCar = state.cars[0] || null;
      }
    },
    setActiveCar: (state, action: PayloadAction<string>) => {
      state.activeCar = state.cars.find(c => c.id === action.payload) || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => { state.isLoading = true; })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;
        // Only replace if API returned data, otherwise keep mock data
        if (action.payload && action.payload.length > 0) {
          state.cars = action.payload;
          state.activeCar = action.payload.find((c: any) => c.isActive) || action.payload[0] || null;
        }
      })
      .addCase(fetchCars.rejected, (state) => { state.isLoading = false; /* keep mock data on failure */ })
      .addCase(addCarAsync.fulfilled, (state, action) => {
        state.cars.unshift(action.payload);
        state.activeCar = action.payload;
      })
      .addCase(deleteCarAsync.fulfilled, (state, action) => {
        state.cars = state.cars.filter(c => c.id !== action.payload);
        if (state.activeCar?.id === action.payload) {
          state.activeCar = state.cars[0] || null;
        }
      });
  },
});

export const { addCar, updateCar, deleteCar, setActiveCar } = garageSlice.actions;
export default garageSlice.reducer;
