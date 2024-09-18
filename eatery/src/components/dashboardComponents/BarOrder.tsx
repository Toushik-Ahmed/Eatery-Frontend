"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import sevenDaysOrder from "@/services/dashboardServices/sevenDaysOrder";

export default function BasicBarsOrder() {
  const [barData, setBarData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sevenDaysOrder();
        console.log("response from barOrderComponent: ", response);

        // Extract orders and dates for BarChart
        const orderValues = response.map(
          (item: { orders: number }) => item.orders
        );
        const dateLabels = response.map((item: { date: string }) => item.date);

        setBarData(orderValues); // Set the order counts for the series
        setLabels(dateLabels); // Set the dates for the X-axis
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Order Chart</h1>
      <BarChart
        xAxis={[{ scaleType: "band", data: labels }]} // Set the dates on the X-axis
        series={[{ data: barData }]} // Set the order counts on the series
        width={500}
        height={300}
      />
    </div>
  );
}
