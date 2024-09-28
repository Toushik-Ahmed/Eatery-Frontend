import axios from "axios";
import { getToken } from "../tokenServices";

const revenueSevenDays = async () => {
  const response = await axios.get(
    "http://localhost:5000/dashboardget/revenueSevenDays",
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return response.data;
};
export default revenueSevenDays;
