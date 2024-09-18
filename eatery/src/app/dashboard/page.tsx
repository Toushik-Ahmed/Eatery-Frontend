"use client";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BasicPie from "@/components/dashboardComponents/Pie";
import BasicBarsOrder from "@/components/dashboardComponents/BarOrder";
import BasicBarsRevenue from "@/components/dashboardComponents/LineRevenue";
import Order from "@/components/dashboardComponents/Order";
import Revenue from "@/components/dashboardComponents/Revenue";

const theme = createTheme();

type Props = {};

function Page({}: Props) {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <BasicPie />
        <BasicBarsOrder />
        <BasicBarsRevenue />
        <Order />
        <Revenue />
      </div>
    </ThemeProvider>
  );
}

export default Page;
