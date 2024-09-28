"use client";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PersistentDrawerLeft from "@/components/tableTryComponents/SideNavTry";

const theme = createTheme();
type Props = {};

function Page({}: Props) {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <PersistentDrawerLeft />
      </div>
    </ThemeProvider>
  );
}

export default Page;
