"use client";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MUINav from "@/components/employeeListComponents/MUINav";

const theme = createTheme();

type Props = {};

function Page({}: Props) {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <MUINav />
      </div>
    </ThemeProvider>
  );
}

export default Page;
