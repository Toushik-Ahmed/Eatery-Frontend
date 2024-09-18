"use client";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BasicPie from "@/components/dashboardComponents/Pie";
import BasicBarsOrder from "@/components/dashboardComponents/BarOrder";
import BasicBarsRevenue from "@/components/dashboardComponents/LineRevenue";

const theme = createTheme();

type Props = {};

function Page({}: Props) {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <BasicPie />
        {/* <BasicBarsOrder /> */}
        <BasicBarsRevenue />
      </div>
    </ThemeProvider>
  );
}

export default Page;
