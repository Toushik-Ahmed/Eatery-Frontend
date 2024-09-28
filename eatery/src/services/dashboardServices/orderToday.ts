import axios from "axios";
import { getToken } from "../tokenServices";

const orderToday = async () => {
<<<<<<< HEAD
  const response = await axios.get("http://localhost:5000/dashboardget/today",
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
=======
  const response = await axios.get("http://localhost:5000/dashboardget/today", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
>>>>>>> 3020dad6327e9836c475caa42847a606957afb23
  return response.data;
};
export default orderToday;
