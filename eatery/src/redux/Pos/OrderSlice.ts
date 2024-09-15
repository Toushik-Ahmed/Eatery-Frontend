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
    addOrderInfo: (state, action: PayloadAction<Item[]>) => {
      state.orderedItems.push(...action.payload);
    },
    removeItemFromOrder: (
      state,
      action: PayloadAction<{ itemId: number; index: number }>
    ) => {
      const { itemId, index } = action.payload;

      state.orderedItems = state.orderedItems.filter(
        (item, i) => !(item.id === itemId && i === index)
      );
    },
  },
});

export default OrderSlice.reducer;
export const { addOrderInfo, removeItemFromOrder } = OrderSlice.actions;
