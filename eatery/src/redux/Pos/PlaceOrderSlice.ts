import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { TableStatus } from "@/components/tableTryComponents/SideNavTry";
import { getToken } from "@/services/tokenServices";
export interface OrderDetails {
  _id?: string;
  tableNo?: number;
  tableStatus?: string;
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
  createdAt?: string;
}

interface PlaceOrderState {
  orderDetails: OrderDetails;
  status: string;
}
const initialState: PlaceOrderState = {
  orderDetails: {
    tableNo: 0,
    tableStatus: "",
    menuItems: [],
    preparationTime: 0,
    totalPrice: 0,
  },
  status: "",
};

export const PlaceOrderSlice = createSlice({
  name: "placeorder",
  initialState,
  reducers: {
    /* addPlaceOrderInfo: (state, action: PayloadAction<OrderDetails>) => {
      return { ...state, ...action.payload };
    }, */
    tableStatus: (state, action: PayloadAction<TableStatus>) => {
      state.orderDetails = {
        ...state.orderDetails,
        tableStatus: action.payload.tableStatus,
        tableNo: action.payload.tableNumber,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        placeOrder.fulfilled,
        (state, action: PayloadAction<OrderDetails>) => {
          state.orderDetails = action.payload;
          state.status = "success";
        }
      )
      .addCase(placeOrder.pending, (state) => {
        state.status = "loading";
      });
  },
});

export const placeOrder = createAsyncThunk(
  "placeorder/placeOrder",
  async (orderDetails: OrderDetails) => {
    const response = await axios.post(
      "http://localhost:5000/pos/new",
      {
        orderDetails,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data;
  }
);

export const getmenuItems = createAsyncThunk("menu/menuItems", async () => {
  const response = await axios.get("http://localhost:5000/menu/allmenu");
  return response.data;
});

export default PlaceOrderSlice.reducer;
export const { tableStatus } = PlaceOrderSlice.actions;
