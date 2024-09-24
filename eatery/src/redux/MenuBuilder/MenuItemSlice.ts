import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface MenuItem {
  _id: string;
  name: string;
  category: string;
  mealTime: { mealtime: string }[];
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
  reducers: {
    resetMenuItem: (state) => {
      state.allItems = [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      getmenuItems.fulfilled,
      (state, action: PayloadAction<MenuItem[]>) => {
        state.allItems = action.payload;
      }
    );
    builder.addCase(
      deleteMenuItem.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.allItems = state.allItems.filter(
          (el) => el._id !== action.payload
        );
      }
    );
    builder.addCase(
      createMenuItem.fulfilled,
      (state, action: PayloadAction<MenuItem>) => {
        state.allItems.push(action.payload);
      }
    );

    builder.addCase(
      uploadImage.fulfilled,
      (state, action: PayloadAction<string>) => {
        // Handle the uploaded image URL as needed, e.g., you might want to store it in state
        console.log("Image uploaded successfully:", action.payload);
      }
    );
  },
});

export const uploadImage = createAsyncThunk(
  "menu/uploadImage",
  async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post(
      "http://localhost:5000/menu/addmenu/upload", // Use the correct port (5000 in this case)
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.imageUrl;
  }
);

export const createMenuItem = createAsyncThunk(
  "menu/createMenuItem",
  async (newMenuItem: Omit<MenuItem, "_id">) => {
    const response = await axios.post(
      "http://localhost:5000/menu/addmenu",
      newMenuItem
    );
    return response.data;
  }
);

export const getmenuItems = createAsyncThunk("menu/menuItems", async () => {
  const response = await axios.get("http://localhost:5000/menu/allmenu");
  return response.data;
});

export const deleteMenuItem = createAsyncThunk(
  "menu/deleteMenuItem",
  async (_id: string) => {
    console.log("Sending DELETE request for item ID:", _id); // Log the ID being sent
    await axios.delete(`http://localhost:5000/menu/items/${_id}`);
    return _id; // Return the deleted item I
  }
);

export const { resetMenuItem } = MenuItemSlice.actions;

export default MenuItemSlice.reducer;
