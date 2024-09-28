import { CartData } from '@/components/customComponents/Cart';

export interface OrderHistory {
  ingredients: CartData[];
  cost: number;
}

const initialState: OrderHistory = {
  ingredients: [],
  cost: 0,
};

