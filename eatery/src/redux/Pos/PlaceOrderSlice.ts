import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
export interface OrderDetails {
  _id?: number;
  tableNo: number;
  tableStatus: string;
  menuItems: {
    itemName: string;
    quantity: number;
    selectedSize: string;
    unitPrice: number;
    sellingPrice: number;
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
  }[];
  preparationTime: number;
  totalPrice: number;
}

const initialState: OrderDetails = {
  tableNo: 0,
  tableStatus: "",
  menuItems: [],
  preparationTime: 0,
  totalPrice: 0,
};

export const PlaceOrderSlice = createSlice({
  name: "placeorder",
  initialState,
  reducers: {
    addPlaceOrderInfo: (state, action: PayloadAction<OrderDetails>) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      placeOrder.fulfilled,
      (state, action: PayloadAction<OrderDetails>) => {
        state.tableNo = action.payload.tableNo;
        state.tableStatus = action.payload.tableStatus;
        state.menuItems = action.payload.menuItems;
        state.preparationTime = action.payload.preparationTime;
        state.totalPrice = action.payload.totalPrice;
      }
    );
    builder.addCase(
      getOrders.fulfilled,
      (state, action: PayloadAction<OrderDetails>) => {
        state.tableNo = action.payload.tableNo;
        state.tableStatus = action.payload.tableStatus;
        state.menuItems = action.payload.menuItems;
        state.preparationTime = action.payload.preparationTime;
        state.totalPrice = action.payload.totalPrice;
      }
    );
  },
});

export const placeOrder = createAsyncThunk(
  "placeorder/placeOrder",
  async (orderDetails: OrderDetails) => {
    const response = await axios.post("http://localhost:5000/pos/new", {
      orderDetails,
    });
    return response.data;
  }
);

export const getOrders = createAsyncThunk("placeorder/getOrders", async () => {
  const response = await axios.get("http://localhost:5000/pos/orders");
  return response.data;
});

export default PlaceOrderSlice.reducer;
export const { addPlaceOrderInfo } = PlaceOrderSlice.actions;
