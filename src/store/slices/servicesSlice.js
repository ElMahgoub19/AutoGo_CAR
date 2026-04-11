// AutoGo - Services Slice
import { createSlice } from '@reduxjs/toolkit';
import { mockServices, mockWorkshops } from '../../data/mockData';

const servicesSlice = createSlice({
  name: 'services',
  initialState: {
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
  },
  reducers: {
    selectService: (state, action) => { state.selectedService = action.payload; },
    selectWorkshop: (state, action) => { state.selectedWorkshop = action.payload; },
    selectDate: (state, action) => { state.selectedDate = action.payload; },
    selectTime: (state, action) => { state.selectedTime = action.payload; },
    setServiceMethod: (state, action) => { state.serviceMethod = action.payload; },
    setCategory: (state, action) => { state.activeCategory = action.payload; },
    setSearchQuery: (state, action) => { state.searchQuery = action.payload; },
    setWorkshopFilter: (state, action) => { state.workshopFilter = action.payload; },
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
