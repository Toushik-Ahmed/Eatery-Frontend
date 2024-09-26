import axios from "axios";

const revenueSevenDays = async () => {
  const response = await axios.get(
    "http://localhost:5000/dashboardget/revenueSevenDays"
  );
  return response.data;
};
export default revenueSevenDays;
