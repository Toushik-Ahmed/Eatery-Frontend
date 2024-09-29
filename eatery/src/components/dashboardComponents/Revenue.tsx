// import React from "react";
// import { useEffect, useState } from "react";
// import revenueToday from "@/services/dashboardServices/revenueToday";

// type Props = {};

// function Revenue({}: Props) {
//   const [revenue, setRevenue] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await revenueToday();
//         console.log("response from Revenue Component: ", response);
//         setRevenue(response);
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Today's Total Revenue</h1>
//       <h1>{revenue ? JSON.stringify(revenue) : "Loading..."}</h1>
//     </div>
//   );
// }

// export default Revenue;

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import revenueToday from "@/services/dashboardServices/revenueToday";

const Revenue = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await revenueToday();
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
    <Card sx={{ maxWidth: 320, width: " 100%" }}>
      <CardHeader sx={{ textAlign: "center" }} title="Total Revenue (Today)" />
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
            {order  ?`$` + JSON.stringify(order) : "No data"}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default Revenue;
