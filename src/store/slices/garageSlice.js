// AutoGo - Garage Slice
import { createSlice } from '@reduxjs/toolkit';
import { mockCars } from '../../data/mockData';

const garageSlice = createSlice({
  name: 'garage',
  initialState: {
    cars: mockCars,
    activeCar: mockCars[0] || null,
    isLoading: false,
  },
  reducers: {
    addCar: (state, action) => {
      const newCar = { ...action.payload, id: `car_${Date.now()}`, status: 'نشط', reminders: [] };
      state.cars.push(newCar);
      if (!state.activeCar) state.activeCar = newCar;
    },
    updateCar: (state, action) => {
      const idx = state.cars.findIndex(c => c.id === action.payload.id);
      if (idx >= 0) {
        state.cars[idx] = { ...state.cars[idx], ...action.payload };
        if (state.activeCar?.id === action.payload.id) {
          state.activeCar = state.cars[idx];
        }
      }
    },
    deleteCar: (state, action) => {
      state.cars = state.cars.filter(c => c.id !== action.payload);
      if (state.activeCar?.id === action.payload) {
        state.activeCar = state.cars[0] || null;
      }
    },
    setActiveCar: (state, action) => {
      state.activeCar = state.cars.find(c => c.id === action.payload) || null;
    },
  },
});

export const { addCar, updateCar, deleteCar, setActiveCar } = garageSlice.actions;
export default garageSlice.reducer;
