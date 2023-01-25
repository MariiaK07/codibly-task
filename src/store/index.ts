import { configureStore } from '@reduxjs/toolkit';
import pageReducer from './page_slice';
import dataReducer from './data_slice';


export const store = configureStore({
  reducer : {
    page: pageReducer.reducer,
    data: dataReducer.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
