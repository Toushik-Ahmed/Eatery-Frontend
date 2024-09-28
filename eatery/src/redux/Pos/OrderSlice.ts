import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MealTime } from "./MenuItemSlice";

export interface Item {
  id: number;
  itemName: string;
  category: string;
  mealTime: MealTime[];
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
  uniqueKey: string;
}

export interface ItemState {
  orderedItems: Item[];
  selectedSizes: { [key: string]: string };
  selectedAddons: { [key: string]: string[] };
}

const initialState: ItemState = {
  orderedItems: [],
  selectedSizes: {},
  selectedAddons: {},
};

export const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrderInfo: (state, action: PayloadAction<Item[]>) => {
      state.orderedItems.push(...action.payload);
    },
    updateSelectedSize(
      state,
      action: PayloadAction<{ itemId: string; sizeName: string }>
    ) {
      state.selectedSizes[action.payload.itemId] = action.payload.sizeName;
    },
    updateSelectedAddons(
      state,
      action: PayloadAction<{
        itemId: string;
        addonName: string;
        isChecked: boolean;
      }>
    ) {
      const currentAddons = state.selectedAddons[action.payload.itemId] || [];
      if (action.payload.isChecked) {
        state.selectedAddons[action.payload.itemId] = [
          ...currentAddons,
          action.payload.addonName,
        ];
      } else {
        state.selectedAddons[action.payload.itemId] = currentAddons.filter(
          (addon) => addon !== action.payload.addonName
        );
      }
    },
    removeItemFromOrder: (
      state,
      action: PayloadAction<{ uniqueKey: string }>
    ) => {
      const { uniqueKey } = action.payload;

      state.orderedItems = state.orderedItems.filter(
        (item) => item.uniqueKey !== uniqueKey
      );
    },
    resetOrderInfo: (state) => {
      state.orderedItems = initialState.orderedItems;
    },
  },
});

export default OrderSlice.reducer;
export const {
  addOrderInfo,
  updateSelectedSize,
  updateSelectedAddons,
  removeItemFromOrder,
  resetOrderInfo,
} = OrderSlice.actions;
