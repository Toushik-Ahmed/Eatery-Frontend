import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Ingredients {
  id?: number;
  ingredient: string;
  unit: string;
  poo: number;
  capacity: number;
}

export interface IngredientsState {
  ingredients: Ingredients[];
}

const initialState: IngredientsState = {
  ingredients: [],
};

export const AddIngredientsSlice = createSlice({
  name: 'add',
  initialState,
  reducers: {
    addIng: (state, action: PayloadAction<Ingredients>) => {
      state.ingredients.push(action.payload);
    },
  },
});
export default AddIngredientsSlice.reducer;
export const { addIng } = AddIngredientsSlice.actions;
