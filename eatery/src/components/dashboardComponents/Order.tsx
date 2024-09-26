import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import orderToday from "@/services/dashboardServices/orderToday";

const Order = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await orderToday();
        setOrder(response);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Card sx={{ maxWidth: 200, width: "100%" }}>
      <CardHeader title="Total Orders (Today)" />
      <CardContent>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={60}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Typography
            align="center"
            variant="h3"
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            {order ? JSON.stringify(order) : "No data available"}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default Order;
