import axios from "axios";
import { getToken } from "../tokenServices";

const updateTable = async (tableData: {}) => {
  const response = await axios.put(
    "http://localhost:5000/tablePOS/updateTable",
    tableData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return response.data;
};
export default updateTable;
