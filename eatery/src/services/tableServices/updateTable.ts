import axios from "axios";

const updateTable = async (tableData: {}) => {
  const response = await axios.put(
    "http://localhost:5000/tablePOS/updateTable",
    tableData
  );
  return response.data;
};
export default updateTable;
