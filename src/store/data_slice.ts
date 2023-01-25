import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IProduct } from '../types/IProduct';


interface DataState {
  items: IProduct[];
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: any;
}

interface ReturnedData {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: IProduct[];
}

const initialState = {
  items: [],
  itemsPerPage: 0,
  totalItems: 0,
  totalPages: 0,
  loading: 'idle',
  error: null,
} as DataState;

const namespace = 'data';

export const fetchData = createAsyncThunk<ReturnedData, string>(
  `${namespace}/fetchData`,
  async (endpoint, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://reqres.in/api/products${endpoint}`);

      if (!response.ok) {
        throw new Error('Data was not found');
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


const dataSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state: DataState) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(fetchData.fulfilled, (state: DataState,  { payload }) => {
      state.loading = 'succeeded';

      if (Array.isArray(payload.data)) {
        state.items = payload.data;
      } else {
        state.items =  [payload.data];
      }

      state.itemsPerPage = payload.per_page;
      state.totalItems = payload.total;
      state.totalPages = payload.total_pages;
    });
    builder.addCase(fetchData.rejected, (state: DataState, { payload }) => {
      state.loading = 'failed';
      state.error = payload;
    });
  }
});

export default dataSlice;
