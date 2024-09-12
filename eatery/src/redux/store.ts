import { configureStore } from '@reduxjs/toolkit';
import {OrderSlice} from './Pos/OrderSlice';

export const store = configureStore({
  reducer: {
    orderInfo : OrderSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch