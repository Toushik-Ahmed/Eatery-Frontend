import { useEffect, useState } from "react";
import getAllEmployee from "@/services/employeeServices/getAllEmployee";

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  userType: string;
  email: string;
  phone: string;
}

interface MUICardProps {
  firstName: string;
  lastName: string;
  userType: string;
  email: string;
  phone: string;
}

const MUICard: React.FC<MUICardProps> = ({
  firstName,
  lastName,
  userType,
  email,
  phone,
}) => (
  <Card variant="outlined" sx={{ minWidth: 275, m: 2 }}>
    <CardContent>
      <Typography variant="h5" component="div">
        {`${firstName} ${lastName}`}
      </Typography>
      <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
        {userType}
      </Typography>
      <Typography variant="body2">
        Email: {email}
        <br />
        Contact: {phone}
      </Typography>
    </CardContent>
  </Card>
);
export default function EmployeeCard() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    // need to edit code for token
    const hard: { message: string; token: string } = {
      message: "Login successful",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmVmZTM2ZWFjZWUyMTc1ZTZjMmFiNzgiLCJlbWFpbCI6InJpendhbmZhaGltMjRAZ21haWwuY29tIiwib3JnYW5pemF0aW9uTmFtZSI6IlByb2plY3QgQ29kZSIsInVzZXJUeXBlIjoiQWRtaW4iLCJpYXQiOjE3MjcwNjkxNTUsImV4cCI6MTcyNzA3Mjc1NX0.j5U3nmfW_HEzFDnr34oMiBgt0jVbGY9xPMxNvn31cgA",
    };

    localStorage.setItem("token", hard.token);
    const token = localStorage.getItem("token");
    console.log("token: ", token);
    if (token) {
      const response = await getAllEmployee(token);
      setEmployees(response);
      console.log("response from backend: ", response);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {employees.map((employee) => (
        <MUICard
          key={employee._id}
          firstName={employee.firstName}
          lastName={employee.lastName}
          userType={employee.userType}
          email={employee.email}
          phone={employee.phone}
        />
      ))}
    </Box>
  );
}
