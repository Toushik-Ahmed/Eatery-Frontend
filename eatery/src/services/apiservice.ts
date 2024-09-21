import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URI;

type SignUpUser = {
  firstName: string;
  lastName: string;
  organizationName: string;
  userType: string;
  email: string;
  phone: string;
  password: string;
};

type LogInUser = {
  organizationName: string;
  userType: string;
  email: string;
  password: string;
};

export const signUp = async (data: SignUpUser) => {
  try {
    const response = await axios.post(`http://localhost:5000/signup`, data);
    console.log(response.data);
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export const logIn = async (data: LogInUser) => {
  try {
    const response = await axios.post(`http://localhost:5000/login`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
