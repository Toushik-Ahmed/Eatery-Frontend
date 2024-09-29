import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const Tableau10 = [
  "#4e79a7",
  "#f28e2c",
  "#e15759",
  "#76b7b2",
  "#59a14f",
  "#edc949",
  "#af7aa1",
  "#ff9da7",
  "#9c755f",
  "#bab0ab",
];

const chartsParams = {
  margin: { bottom: 20, left: 2, right: 5 },
  height: 300,
};
export default function Wastage() {
  const [color, setColor] = React.useState("#4e79a7");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    nextColor: string
  ) => {
    setColor(nextColor);
  };

  return (
    <Stack
      direction="column"

      alignItems="center"
      sx={{ maxWidth: 400, maxHeight: 250, width: "100%", height: "100%" }}
      
    >
      <LineChart
        {...chartsParams}
        series={[
          {
            data: [0, 10, 20, 15, 10],
            color,
          },
        ]}
      />
      <ToggleButtonGroup
        // orientation="vertical"
        value={color}
        exclusive
        onChange={handleChange}
      ></ToggleButtonGroup>
      <h2
        style={{
          fontFamily: "Arial, sans-serif",
          color: "#333",
          justifyContent: "center",
          fontSize: "20px",
        }}
      >
        Total Wastage (7 Days)
      </h2>
    </Stack>
  );
}
