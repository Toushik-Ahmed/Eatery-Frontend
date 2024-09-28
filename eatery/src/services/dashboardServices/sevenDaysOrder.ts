import axios from "axios";
import { getToken } from "../tokenServices";

const sevenDaysOrder = async () => {
  const response = await axios.get(
    "http://localhost:5000/dashboardget/sevendays",
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return response.data;
};
export default sevenDaysOrder;
