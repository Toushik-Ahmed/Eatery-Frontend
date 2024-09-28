import { getToken } from "@/services/tokenServices";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface MenuItem {
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
}

export interface MealTime {
  mealtime: string;
}
export interface MenuItemState {
  allItems: MenuItem[];
  topSellingItems: TopSell[];
}

export interface TopSell {
  itemName: string;
  count: number;
}

const initialState: MenuItemState = {
  allItems: [],
  topSellingItems: [],
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
    builder.addCase(
      getTopSellingItems.fulfilled,
      (state, action: PayloadAction<TopSell[]>) => {
        state.topSellingItems = action.payload;
      }
    );
  },
});

export const getmenuItems = createAsyncThunk("menu/getmenuItems", async () => {
  const response = await axios.get("http://localhost:5000/menu/allmenu", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
});
export const getTopSellingItems = createAsyncThunk(
  "menu/getTopSellingItemss",
  async () => {
    const response = await axios.get("http://localhost:5000/pos/bestsell",
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data;
  }
);

export default MenuItemSlice.reducer;
