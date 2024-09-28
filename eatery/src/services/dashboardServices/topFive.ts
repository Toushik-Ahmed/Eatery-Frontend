import axios from "axios";

const topFive = async () => {
  const response = await axios.get(
    "http://localhost:5000/dashboardget/topFive"
  );
  return response.data;
};
export default topFive;
