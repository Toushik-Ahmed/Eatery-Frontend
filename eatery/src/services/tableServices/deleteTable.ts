import axios from "axios";

const deleteTable = async (tableNumber: number) => {
  const response = await axios.delete(
    `http://localhost:5000/tablePOS/delete/${tableNumber}`
  );
  return response.data;
};

export default deleteTable;
