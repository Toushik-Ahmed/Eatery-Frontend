import React from "react";
import { useEffect, useState } from "react";
import orderToday from "@/services/dashboardServices/orderToday";

type Props = {};

function Order({}: Props) {
  const [order, setOrder] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await orderToday();
        console.log("response from Order Component: ", response);
        setOrder(response);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Today's Total Order</h1>
      <h1>{order ? JSON.stringify(order) : "Loading..."}</h1>
    </div>
  );
}

export default Order;
