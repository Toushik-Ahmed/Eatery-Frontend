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

        const orderValues = response.map(
          (item: { revenue: number }) => item.revenue
        );
        const dateLabels = response.map((item: { date: string }) => item.date);

        setBarData(orderValues);
        setLabels(dateLabels);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        textAlign: "center",
      }}
    >
      <BarChart
        xAxis={[{ scaleType: "band", data: labels }]}
        series={[{ data: barData }]}
        width={800}
        height={300}
      />{" "}
      <h2
        style={{
          fontFamily: "Arial, sans-serif",
          color: "#333",
          justifyContent: "center",
          fontSize: "20px",
        }}
      >
        Total Revenue (7 Days)
      </h2>
    </div>
  );
}
