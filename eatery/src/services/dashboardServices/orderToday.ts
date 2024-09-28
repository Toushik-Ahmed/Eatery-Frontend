import axios from "axios";

const orderToday = async () => {
  const response = await axios.get("http://localhost:5000/dashboardget/today");
  return response.data;
};
export default orderToday;
