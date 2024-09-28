import axios from "axios";
import { getToken } from "../tokenServices";

const orderToday = async () => {
  const response = await axios.get("http://localhost:5000/dashboardget/today", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};
export default orderToday;
