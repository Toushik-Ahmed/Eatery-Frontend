import { wastageTable } from '@/components/wastageComponents/WastageTable';
import axios from 'axios';

export const getAllWastageItems = async (): Promise<wastageTable[]> => {
  const response = await axios.get(
    `http://localhost:5000/ingredient/expired-items`
  );
  return response.data;
};
