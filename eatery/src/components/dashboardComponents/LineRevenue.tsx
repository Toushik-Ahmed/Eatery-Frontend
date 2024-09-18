"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import revenueSevenDays from "@/services/dashboardServices/revenueSevenDays";

export default function BasicBarsRevenue() {
  const [barData, setBarData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await revenueSevenDays();
        console.log("response from Revenue: ", response);

        // Extract orders and dates for BarChart
        const orderValues = response.map(
          (item: { revenue: number }) => item.revenue
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
    <BarChart
      xAxis={[{ scaleType: "band", data: labels }]} // Set the dates on the X-axis
      series={[{ data: barData }]} // Set the order counts on the series
      width={500}
      height={300}
    />
  );
}
