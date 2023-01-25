import { createSlice } from '@reduxjs/toolkit';

interface PageState {
  value: number;
}

const pageSlice = createSlice({
  name: 'page',
  initialState: { value: 1 } as PageState,
  reducers: {
    setPage: (state: PageState, { payload }) => {
      state.value = payload;
    },
  }
});

export const { setPage } = pageSlice.actions;

export default pageSlice;
