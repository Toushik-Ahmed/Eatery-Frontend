import axios from "axios";
import { getToken } from "../tokenServices";

const revenueToday = async () => {
  const response = await axios.get(
    "http://localhost:5000/dashboardget/revenueToday",
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return response.data;
};
export default revenueToday;
