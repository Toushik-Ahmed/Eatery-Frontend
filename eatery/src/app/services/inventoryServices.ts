import axios from 'axios';

export const getAllVendorItems=async () => {
  const response = await axios.get(
    'http://localhost:5000/ingredient/vendor-items'
  );
  return response.data;
};