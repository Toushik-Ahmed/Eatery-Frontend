import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Item {
  id: number;
  name: string;
  category: string;
  tastyTag: string;
  mealTime: string[];
  description: string;
  image: string;
  size: {
    sizeName: string;
    ingredients: {
      name: string;
      properties: {
        quantity: number;
        unit: string;
      };
    }[];
    preparationTime: number;
    sellingPrice: number;
    addOns: {
      name: string;
      quantity: number;
      unit: string;
      addonPrice: number;
    }[];
  }[];
}

export interface ItemState {
  orderedItems: Item[];
}

const initialState: ItemState = {
  orderedItems: [],
};

export const OrderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
      addOrderInfo: (
        state,
        action: PayloadAction<Item[]>
      ) => {
        state.orderedItems.push(...action.payload);
      },
    },
  });

export default OrderSlice.reducer;
export const { addOrderInfo } = OrderSlice.actions;
