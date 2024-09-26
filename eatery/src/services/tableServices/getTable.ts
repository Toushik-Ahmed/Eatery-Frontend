import axios from "axios";

const getTable = async () => {
  const response = await axios.get("http://localhost:5000/tablePOS/get");
  return response.data;
};
export default getTable;
