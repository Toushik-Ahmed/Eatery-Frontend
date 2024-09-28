import axios from "axios";

const sevenDaysOrder = async () => {
  const response = await axios.get(
    "http://localhost:5000/dashboardget/sevendays"
  );
  return response.data;
};
export default sevenDaysOrder;
