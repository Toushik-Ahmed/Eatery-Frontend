import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface TableProps {
  tableNumber: number;
  onDelete: (e: React.MouseEvent) => void;
  status: string;
}

const tableStyle = {
  border: "2px solid #333",
  borderRadius: "10px",
  padding: "10px",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  justifyContent: "center",
  width: "150px",
  height: "150px",
  margin: "10px",
  position: "relative" as const,
};

const deleteButtonStyle = {
  position: "absolute" as const,
  top: "-40px",
  right: "-10px",
};

const TableBase: React.FC<TableProps & { children: React.ReactNode }> = ({
  tableNumber,
  onDelete,
  children,
  status,
}) => (
  <Box
    sx={{
      ...tableStyle,
      bgcolor: status.toLowerCase() === "occupied" ? "lightgreen" : "white",
    }}
  >
    <Typography
      variant="subtitle1"
      sx={{
        position: "absolute",
        top: "-30px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      Table {tableNumber}
    </Typography>
    {children}
    <IconButton size="large" sx={deleteButtonStyle} onClick={onDelete}>
      <DeleteIcon />
    </IconButton>
  </Box>
);

export const Table1: React.FC<TableProps> = (props) => (
  <TableBase {...props}>
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          width: "17px",
          height: "17px",
          backgroundColor: "black",
          borderRadius: "50%",
          marginBottom: "2px",
        }}
      />
    </Box>
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          width: "50px",
          height: "50px",
          border: "2px solid black",
          backgroundColor: "transparent",
          borderRadius: "50%",
        }}
      />
    </Box>
  </TableBase>
);

export const Table2: React.FC<TableProps> = (props) => (
  <TableBase {...props}>
    <Box sx={{ display: "flex", justifyContent: "start" }}>
      <Box
        sx={{
          width: "17px",
          height: "17px",
          backgroundColor: "black",
          borderRadius: "50%",
          marginBottom: "2px",
        }}
      />
    </Box>
    <Box sx={{ display: "flex", justifyContent: "start" }}>
      <Box
        sx={{
          width: "50px",
          height: "50px",
          border: "2px solid black",
          backgroundColor: "transparent",
          borderRadius: "50%",
        }}
      />
    </Box>
    <Box sx={{ display: "flex", justifyContent: "start" }}>
      <Box
        sx={{
          width: "17px",
          height: "17px",
          backgroundColor: "black",
          borderRadius: "50%",
          marginTop: "2px",
        }}
      />
    </Box>
  </TableBase>
);
export const Table3: React.FC<TableProps> = (props) => (
  <TableBase {...props}>
    <Box sx={{ position: "relative", width: "80px", height: "80px" }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "17px",
          height: "17px",
          backgroundColor: "black",
          borderRadius: "50%",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "17px",
          height: "17px",
          backgroundColor: "black",
          borderRadius: "50%",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "17px",
          height: "17px",
          backgroundColor: "black",
          borderRadius: "50%",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50px",
          height: "50px",
          border: "2px solid black",
          borderRadius: "50%",
        }}
      />
    </Box>
  </TableBase>
);

const RectangleTable: React.FC<{ circleCount: number }> = ({ circleCount }) => {
  const circlePositions = {
    4: [
      { top: "-20px", left: "50%", transform: "translateX(-50%)" },
      { bottom: "-20px", left: "50%", transform: "translateX(-50%)" },
      { top: "50%", left: "-20px", transform: "translateY(-50%)" },
      { top: "50%", right: "-20px", transform: "translateY(-50%)" },
    ],
    5: [
      { top: "-20px", left: "25%" },
      { top: "-20px", right: "25%" },
      { bottom: "-20px", left: "25%" },
      { bottom: "-20px", right: "25%" },
      { top: "50%", right: "95%", transform: "translate(-50%, -50%)" },
    ],
    6: [
      { top: "-20px", left: "25%" },
      { top: "-20px", right: "25%" },
      { bottom: "-20px", left: "25%" },
      { bottom: "-20px", right: "25%" },
      { top: "50%", left: "-20px", transform: "translateY(-50%)" },
      { top: "50%", right: "-20px", transform: "translateY(-50%)" },
    ],
    7: [
      { top: "-20px", left: "25%" },
      { top: "-20px", right: "25%" },
      { bottom: "-20px", left: "25%" },
      { bottom: "-20px", right: "25%" },
      { top: "30%", left: "-20px", transform: "translateY(-50%)" },
      { top: "50%", right: "-20px", transform: "translateY(-50%)" },
      { top: "60%", left: "-12px", transform: "translate(-50%, -50%)" },
    ],
    8: [
      { top: "-20px", left: "25%" },
      { top: "-20px", right: "25%" },
      { bottom: "-20px", left: "25%" },
      { bottom: "-20px", right: "25%" },
      { top: "30%", left: "-20px", transform: "translateY(-50%)" },
      { top: "60%", right: "-20px", transform: "translateY(-50%)" },
      { top: "30%", right: "-20px", transform: "translateY(-50%)" },
      { top: "60%", left: "-20px", transform: "translateY(-50%)" },
    ],
  };

  return (
    <Box sx={{ position: "relative", width: "80px", height: "80px" }}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          border: "2px solid black",
          backgroundColor: "transparent",
        }}
      />
      {circlePositions[circleCount as keyof typeof circlePositions].map(
        (position, index) => (
          <Box
            key={index}
            sx={{
              position: "absolute",
              width: "15px",
              height: "15px",
              backgroundColor: "black",
              borderRadius: "50%",
              ...position,
            }}
          />
        )
      )}
    </Box>
  );
};

export const Table4: React.FC<TableProps> = (props) => (
  <TableBase {...props}>
    <RectangleTable circleCount={4} />
  </TableBase>
);

export const Table5: React.FC<TableProps> = (props) => (
  <TableBase {...props}>
    <RectangleTable circleCount={5} />
  </TableBase>
);

export const Table6: React.FC<TableProps> = (props) => (
  <TableBase {...props}>
    <RectangleTable circleCount={6} />
  </TableBase>
);

export const Table7: React.FC<TableProps> = (props) => (
  <TableBase {...props}>
    <RectangleTable circleCount={7} />
  </TableBase>
);

export const Table8: React.FC<TableProps> = (props) => (
  <TableBase {...props}>
    <RectangleTable circleCount={8} />
  </TableBase>
);
