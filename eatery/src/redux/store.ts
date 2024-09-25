import { configureStore } from "@reduxjs/toolkit";
import { OrderSlice } from "./Pos/OrderSlice";
import { PlaceOrderSlice } from "./Pos/PlaceOrderSlice";
import { AddIngredientsSlice } from "./inventory/AddIngredientsSlice";
import { MenuItemSlice } from "./Pos/MenuItemSlice";
import { MenuCardSlice } from "./MenuBuilder/MenuCardSlice";

export const store = configureStore({
  reducer: {
    orderInfo: OrderSlice.reducer,
    placeOrder: PlaceOrderSlice.reducer,
    allItem: MenuItemSlice.reducer,
    cardItem: MenuCardSlice.reducer,
    addIngredients: AddIngredientsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
