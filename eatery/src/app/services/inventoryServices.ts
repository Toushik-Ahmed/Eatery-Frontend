import axios from 'axios';

export const getAllVendorItems = async ({ pageNumber, pageSize }: { pageNumber: number; pageSize: number }) => {
  const response = await axios.get(
    `http://localhost:5000/ingredient/vendor-items?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );
  return response.data;
};