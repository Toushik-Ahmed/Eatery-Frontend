import axios from "axios";

const revenueToday = async () => {
  const response = await axios.get(
    "http://localhost:5000/dashboardget/revenueToday"
  );
  return response.data;
};
export default revenueToday;
