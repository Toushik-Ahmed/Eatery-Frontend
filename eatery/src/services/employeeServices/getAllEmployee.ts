import axios from 'axios';
import { getToken } from '../tokenServices';

const getAllEmployee = async () => {
  try {
    const response = await axios.get('http://localhost:5000/hr/employee-list', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch event details');
  }
};

export default getAllEmployee;
