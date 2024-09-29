// import React from "react";
// import { useEffect, useState } from "react";
// import orderToday from "@/services/dashboardServices/orderToday";

// type Props = {};

// function Order({}: Props) {
//   const [order, setOrder] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await orderToday();
//         console.log("response from Order Component: ", response);
//         setOrder(response);
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Today's Total Order</h1>
//       <h1>{order ? JSON.stringify(order) : "Loading..."}</h1>
//     </div>
//   );
// }

// export default Order;

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
import { Center } from "@chakra-ui/react";

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
    <Card sx={{ maxWidth: 320, width: "100%" }}>
      <CardHeader sx={{textAlign: "center"}} title="Total Orders (Today)" />
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

export default Order;
