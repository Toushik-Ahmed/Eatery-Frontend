import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const Tableau10 = [
  '#4e79a7',
  '#f28e2c',
  '#e15759',
  '#76b7b2',
  '#59a14f',
  '#edc949',
  '#af7aa1',
  '#ff9da7',
  '#9c755f',
  '#bab0ab',
];

const chartsParams = {
  margin: { bottom: 20, left: 25, right: 5 },
  height: 300,
};
export default function BasicColor() {
  const [color, setColor] = React.useState('#4e79a7');

  const handleChange = (event: React.MouseEvent<HTMLElement>, nextColor: string) => {
    setColor(nextColor);
  };

  return (
    <Stack
      direction="column"
      spacing={2}
      alignItems="center"
      sx={{ maxWidth: 400, maxHeight: 250, width: "100%", height:"100%" }}
    >
      <LineChart
        {...chartsParams}
        series={[
          {
            data: [10, 20, 30, 50, 80],
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
    </Stack>
  );
}
