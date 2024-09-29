import axios from "axios";
import { getToken } from "../tokenServices";

const expenditureToday = async () => {
  const response = await axios.get(
    "http://localhost:5000/dashboardget/expenditure",
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return response.data;
};
export default expenditureToday;
