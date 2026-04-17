// AutoGo - Services Slice
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockServices, mockWorkshops } from '../../data/mockData';
import type { Service, Workshop, ServicesState } from '../../types';

const initialState: ServicesState = {
  services: mockServices,
  workshops: mockWorkshops,
  selectedService: null,
  selectedWorkshop: null,
  selectedDate: null,
  selectedTime: null,
  serviceMethod: null, // 'center' or 'mobile'
  activeCategory: 'الكل',
  searchQuery: '',
  workshopFilter: 'الأقرب',
};

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    selectService: (state, action: PayloadAction<Service | null>) => { state.selectedService = action.payload; },
    selectWorkshop: (state, action: PayloadAction<Workshop | null>) => { state.selectedWorkshop = action.payload; },
    selectDate: (state, action: PayloadAction<string | null>) => { state.selectedDate = action.payload; },
    selectTime: (state, action: PayloadAction<string | null>) => { state.selectedTime = action.payload; },
    setServiceMethod: (state, action: PayloadAction<'center' | 'mobile' | null>) => { state.serviceMethod = action.payload; },
    setCategory: (state, action: PayloadAction<string>) => { state.activeCategory = action.payload; },
    setSearchQuery: (state, action: PayloadAction<string>) => { state.searchQuery = action.payload; },
    setWorkshopFilter: (state, action: PayloadAction<string>) => { state.workshopFilter = action.payload; },
    resetBooking: (state) => {
      state.selectedService = null;
      state.selectedWorkshop = null;
      state.selectedDate = null;
      state.selectedTime = null;
      state.serviceMethod = null;
    },
  },
});

export const {
  selectService, selectWorkshop, selectDate, selectTime,
  setServiceMethod, setCategory, setSearchQuery, setWorkshopFilter, resetBooking,
} = servicesSlice.actions;
export default servicesSlice.reducer;
