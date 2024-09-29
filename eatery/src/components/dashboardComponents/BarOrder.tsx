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

        const orderValues = response.map(
          (item: { orders: number }) => item.orders
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
        marginTop: "10px",
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
        Total Order (7 Days)
      </h2>
    </div>
  );
}
