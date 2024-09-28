import axios from "axios";
import { getToken } from "./tokenServices";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URI;

export type SignUpUser = {
  firstName: string;
  lastName: string;
  organizationName: string;
  userType: string;
  email: string;
  phone: string;
  password: string;
};

export interface LoggedInuser {
  user: {
    userId?: string;
    firstName: string;
    lastName: string;
    organizationName: string;
    userType: string;
    email: string;
    phone: string;
  };
}

type LogInUser = {
  organizationName: string;
  userType: string;
  email: string;
  password: string;
};

export const signUp = async (data: SignUpUser): Promise<{ token: string }> => {
  try {
    const response = await axios.post(`http://localhost:5000/signup`, data);
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export const logIn = async (data: LogInUser): Promise<{ token: string }> => {
  try {
    const response = await axios.post(`http://localhost:5000/login`, data);

    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

//getLogedIn user data

export const loggedInuser = async (): Promise<LoggedInuser> => {
  try {
    const response = await axios.get(`http://localhost:5000/user-data`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
