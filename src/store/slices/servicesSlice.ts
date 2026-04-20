// AutoGo - Services Slice (API-connected with mock fallback)
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../api/apiClient';
import type { Service, Workshop, ServicesState } from '../../types';
import { mockServices, mockWorkshops } from '../../data/mockData';

// Fetch services from API
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (category?: string) => {
    const query = category && category !== 'الكل' ? `?category=${encodeURIComponent(category)}` : '';
    const res = await api.get(`/services${query}`);
    return res.data;
  }
);

// Fetch workshops from API
export const fetchWorkshops = createAsyncThunk(
  'services/fetchWorkshops',
  async (params?: { lat?: number; lng?: number; filter?: string }) => {
    const query = new URLSearchParams();
    if (params?.lat) query.set('lat', String(params.lat));
    if (params?.lng) query.set('lng', String(params.lng));
    if (params?.filter) query.set('filter', params.filter);
    const qs = query.toString();
    const res = await api.get(`/workshops${qs ? `?${qs}` : ''}`);
    return res.data;
  }
);

// Fetch service categories
export const fetchCategories = createAsyncThunk(
  'services/fetchCategories',
  async () => {
    const res = await api.get('/services/categories');
    return res.data;
  }
);

// Start with mock data so the app always looks professional
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.fulfilled, (state, action) => {
        // Only replace if API returned data, otherwise keep mock data
        if (action.payload && action.payload.length > 0) {
          state.services = action.payload;
        }
      })
      .addCase(fetchWorkshops.fulfilled, (state, action) => {
        // Only replace if API returned data, otherwise keep mock data
        if (action.payload && action.payload.length > 0) {
          state.workshops = action.payload;
        }
      });
  },
});

export const {
  selectService, selectWorkshop, selectDate, selectTime,
  setServiceMethod, setCategory, setSearchQuery, setWorkshopFilter, resetBooking,
} = servicesSlice.actions;
export default servicesSlice.reducer;
