import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface MenuItem {
  id: number;
  name: string;
  category: string;
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

export interface MenuItemState {
  allItems: MenuItem[];
}

const initialState: MenuItemState = {
  allItems: [],
};

export const MenuItemSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getmenuItems.fulfilled,
      (state, action: PayloadAction<MenuItem[]>) => {
        state.allItems = action.payload;
      }
    );
  },
});

export const getmenuItems = createAsyncThunk("menu/menuItems", async () => {
  const response = await axios.get("http://localhost:5000/menu/allmenu");
  return response.data;
});

export default MenuItemSlice.reducer;
//   export const { getmenuItems } = MenuItemSlice.actions;
