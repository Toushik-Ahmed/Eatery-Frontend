import axios from "axios";
import { getToken } from "../tokenServices";

const orderToday = async () => {
<<<<<<< HEAD
  const response = await axios.get("http://localhost:5000/dashboardget/today", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
=======
  const response = await axios.get("http://localhost:5000/dashboardget/today",
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
>>>>>>> 937ca6be49e3a46a9845f763685429117b82779b
  return response.data;
};
export default orderToday;
