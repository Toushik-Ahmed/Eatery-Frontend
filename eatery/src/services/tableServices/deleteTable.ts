import axios from "axios";
import { getToken } from "../tokenServices";

const deleteTable = async (tableNumber: number) => {
  const response = await axios.delete(
    `http://localhost:5000/tablePOS/delete/${tableNumber}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return response.data;
};

export default deleteTable;
