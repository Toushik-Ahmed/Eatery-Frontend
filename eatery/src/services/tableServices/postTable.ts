import axios from "axios";

const postTable = async (tableData: {}) => {
  const response = await axios.post(
    "http://localhost:5000/tablePOS/add",
    tableData
  );
  return response.data;
};
export default postTable;
