import { configureStore } from '@reduxjs/toolkit';
// import {OrderSlice} from './Pos/OrderSlice';
// import {PlaceOrderSlice} from './Pos/PlaceOrderSlice';
import {MenuItemSlice} from './MenuBuilder/MenuItemSlice'

export const store = configureStore({
  reducer: {
    // orderInfo : OrderSlice.reducer,
    // placeOrder: PlaceOrderSlice.reducer,
    allItem: MenuItemSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch