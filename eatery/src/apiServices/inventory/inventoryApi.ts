import { getToken } from "@/services/tokenServices";
import axios from "axios";

export const getAllWastageItems = async ({
  pageNumber,
  pageSize,
}: {
  pageNumber: number;
  pageSize: number;
}) => {
  const response = await axios.get(
    `http://localhost:5000/ingredient/expired-items?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return response.data;
};
