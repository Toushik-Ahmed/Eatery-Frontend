import axios from "axios";
import { getToken } from "../tokenServices";

const postTable = async (tableData: {}) => {
  const response = await axios.post(
    "http://localhost:5000/tablePOS/add",
    tableData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return response.data;
};
export default postTable;
