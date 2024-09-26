"use client"; // Keep this since the layout relies on client-side features

import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import localFont from "next/font/local";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";

// Import local fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Create a Material UI theme
const muiTheme = createTheme({
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
  palette: {
    primary: {
      main: "#1976d2", // Customize your primary color
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          {/* Wrap the app with both ChakraProvider and Material UI's ThemeProvider */}
          <ChakraProvider>
            <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
          </ChakraProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
