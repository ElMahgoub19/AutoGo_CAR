// AutoGo - Address Slice
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../api/apiClient';
import type { Address } from '../../types';

export interface AddressState {
  addresses: Address[];
  isLoading: boolean;
  error: string | null;
}

export const fetchAddresses = createAsyncThunk(
  'address/fetchAddresses',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/addresses');
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const addAddressAsync = createAsyncThunk(
  'address/addAddress',
  async (addressData: { label: string; address: string }, { rejectWithValue }) => {
    try {
      const res = await api.post('/addresses', addressData);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteAddressAsync = createAsyncThunk(
  'address/deleteAddress',
  async (addressId: string, { rejectWithValue }) => {
    try {
      await api.delete(`/addresses/${addressId}`);
      return addressId;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState: AddressState = {
  addresses: [],
  isLoading: false,
  error: null,
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload && action.payload.length >= 0) {
          state.addresses = action.payload;
        }
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(addAddressAsync.fulfilled, (state, action) => {
        state.addresses.push(action.payload);
      })
      .addCase(deleteAddressAsync.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter(a => a.id !== action.payload);
      });
  },
});

export default addressSlice.reducer;
