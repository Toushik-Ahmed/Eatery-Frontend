import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { OrderHistory } from './OrderHistorySlice';

export interface IngredientsTable {
  _id?: string;
  ingredient: string;
  currentStock: number;
  unit: string;
  cost: number;
  incomingStock: string;
  poo: number;
  capacity: number;
  prevStock: number;
  prevExpiary: string;
  newStock: number;
  newStockExpiry: string;
}

export interface AddIngredient {
  ingredient: string;
  poo: number;
  unit: string;
  capacity: number;
}

// Define the state interface
export interface IngredientsState {
  ingredients: Partial<IngredientsTable>[];
}

// Initial state
const initialState: IngredientsState = {
  ingredients: [],
};

// Create the slice
export const AddIngredientsSlice = createSlice({
  name: 'addIngredients',
  initialState,
  reducers: {
    // Action to add a single ingredient
    addIng: (state, action: PayloadAction<Partial<IngredientsTable>>) => {
      state.ingredients.push(action.payload);
    },
    // Action to update or add an ingredient
    orderIng: (state, action: PayloadAction<Partial<IngredientsTable>>) => {
      const newItem = action.payload;
      const existingItemIndex = state.ingredients.findIndex(
        (item) => item._id === newItem
      );

      if (existingItemIndex >= 0) {
        // Update the existing item
        state.ingredients[existingItemIndex] = {
          ...state.ingredients[existingItemIndex],
          ...newItem,
        };
      } else {
        // Add the new item
        state.ingredients.push(newItem);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      postOrder.fulfilled,
      (state, action: PayloadAction<OrderHistory>) => {
        state.ingredients.push(action.payload);
      }
    );
    builder.addCase(
      postAddIngredient.fulfilled,
      (state, action: PayloadAction<AddIngredient>) => {
        state.ingredients.push(action.payload);
      }
    );
    builder.addCase(
      getAllIngredients.fulfilled,
      (state, action: PayloadAction<IngredientsTable[]>) => {
        state.ingredients = action.payload;
      }
    );
    builder.addCase(
      deleteIngredient.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.ingredients = state.ingredients.filter(
          (item) => item._id !== action.payload
        );
      }
    );
  },
});

export const postOrder = createAsyncThunk(
  'ingredients/order',
  async (order: OrderHistory) => {
    const response = await axios.post('http://localhost:5000/stock/new', order);
    return response.data;
  }
);

export const postAddIngredient = createAsyncThunk(
  'ingredient/add',
  async (addIngredient: AddIngredient) => {
    const response = await axios.post(
      'http://localhost:5000/ingredient/addingredient',
      addIngredient
    );
    return response.data;
  }
);

export const getAllIngredients = createAsyncThunk(
  'inventory/allIngredients',
  async () => {
    const response = await axios.get(
      'http://localhost:5000/ingredient/allingredient'
    );
    return response.data;
  }
);

export const deleteIngredient = createAsyncThunk(
  'inventory/deleteIngredient',
  async (id: string) => {
    const response = await axios.delete(
      `http://localhost:5000/ingredient/delete-ingredient`,
      { data: { id } }
    );
    return id;
  }
);

export default AddIngredientsSlice.reducer;
export const { addIng, orderIng } = AddIngredientsSlice.actions;
