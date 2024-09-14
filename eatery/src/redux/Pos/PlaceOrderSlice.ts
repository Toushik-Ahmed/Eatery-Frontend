import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface OrderDetails {
  table_no: number;
  menu_items: {
    menu_item_details: {
      itemName: string;
      quantity: number;
      selectedSize: string;
      itemPrice: number;
      ingredients: {
        name: string;
        properties: {
          quantity: number;
          unit: string;
        };
      }[];
      addOns: {
        name: string;
        quantity: number;
        unit: string;
        addonPrice: number;
      }[];
    };
  }[];
  preparationTime: number;
  totalPrice: number;
}

export interface OrderDetailsState {
  totalItems: OrderDetails[];
}

const initialState: OrderDetailsState = {
  totalItems: [],
};

export const PlaceOrderSlice = createSlice({
  name: "placeorder",
  initialState,
  reducers: {
    addPlaceOrderInfo: (state, action: PayloadAction<OrderDetails[]>) => {
      state.totalItems.push(...action.payload);
    },
  },
});

export default PlaceOrderSlice.reducer;
export const { addPlaceOrderInfo } = PlaceOrderSlice.actions;
