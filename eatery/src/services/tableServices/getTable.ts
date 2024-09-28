import axios from "axios";
import { getToken } from "../tokenServices";

const getTable = async () => {
  const response = await axios.get("http://localhost:5000/tablePOS/get", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};
export default getTable;
