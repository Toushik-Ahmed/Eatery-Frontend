import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
export interface OrderDetails {
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


interface PlaceOrderState {
  orderDetails: OrderDetails;
}
const initialState: PlaceOrderState = {
  orderDetails: {
    tableNo: 0,
    tableStatus: "",
    menuItems: [],
    preparationTime: 0,
    totalPrice: 0,
  },
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
        state.orderDetails = action.payload;
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
    return response.data.order;
  }
);

export default PlaceOrderSlice.reducer;
export const { addPlaceOrderInfo } = PlaceOrderSlice.actions;

/* export const getOrders = createAsyncThunk("placeorder/getOrders", async () => {
  const response = await axios.get("http://localhost:5000/pos/orders");
  return response.data;
}); */
