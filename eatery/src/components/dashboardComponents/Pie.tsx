"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import topFive from "@/services/dashboardServices/topFive";

export default function BasicPie() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await topFive();
        console.log("response from pieComponent: ", response);
        const formattedData = response.map(
          (item: { count: number; itemName: string }, index: number) => ({
            id: index,
            value: item.count,
            label: item.itemName,
          })
        );
        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <PieChart
      series={[
        {
          data: chartData,
        },
      ]}
      width={400}
      height={200}
    />
  );
}
