import React from "react";
import { useEffect, useState } from "react";
import revenueToday from "@/services/dashboardServices/revenueToday";

type Props = {};

function Revenue({}: Props) {
  const [revenue, setRevenue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await revenueToday();
        console.log("response from Revenue Component: ", response);
        setRevenue(response);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Today's Total Revenue</h1>
      <h1>{revenue ? JSON.stringify(revenue) : "Loading..."}</h1>
    </div>
  );
}

export default Revenue;
