import axios from "axios";
import { getToken } from "../tokenServices";

const topFive = async () => {
  const response = await axios.get(
    "http://localhost:5000/dashboardget/topFive",
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return response.data;
};
export default topFive;
