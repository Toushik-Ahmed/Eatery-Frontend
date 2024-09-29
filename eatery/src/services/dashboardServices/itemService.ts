import axios from "axios";
import { getToken } from "../tokenServices";

const items = async () => {
  const response = await axios.get("http://localhost:5000/dashboardget/items", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};
export default items;
