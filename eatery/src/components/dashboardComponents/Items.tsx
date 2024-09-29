import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { Center } from "@chakra-ui/react";
import items from "@/services/dashboardServices/itemService";

const Items = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await items();
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
    <Card sx={{ maxWidth: 320, width: "100%" }}>
      <CardHeader sx={{ textAlign: "center" }} title="Available Items" />
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
            {order ? JSON.stringify(order) : "No data"}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default Items;
