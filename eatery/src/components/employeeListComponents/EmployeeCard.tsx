import getAllEmployee from '@/services/employeeServices/getAllEmployee';
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';

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
      <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
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
    const getToken = async () => {
      const response = await getAllEmployee();
      setEmployees(response);
      console.log('response from backend: ', response);
    };
    getToken();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        
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
