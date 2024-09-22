import axios from "axios";

const getAllEmployee = async (token: string) => {
  try {
    const response = await axios.get("http://localhost:5000/hr/employee-list", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch event details");
  }
};

export default getAllEmployee;
