import * as React from "react";
import Link from "next/link";
import { styled, useTheme, Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import WidgetsIcon from "@mui/icons-material/Widgets";
import postTable from "@/services/tableServices/postTable";
import getTable from "@/services/tableServices/getTable";
import deleteTable from "@/services/tableServices/deleteTable";
import {
  Table1,
  Table2,
  Table3,
  Table4,
  Table5,
  Table6,
  Table7,
  Table8,
} from "./tableTry";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

interface TableData {
  number: number;
  capacity: number;
}

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [rightDrawerOpen, setRightDrawerOpen] = React.useState(false);
  const [tableNumber, setTableNumber] = React.useState("");
  const [seatingCapacity, setSeatingCapacity] = React.useState("");
  const [tables, setTables] = React.useState<TableData[]>([]);

  React.useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await getTable();
      setTables(response);
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleRightDrawerClose = () => {
    setRightDrawerOpen(false);
  };

  const handleRightDrawerOpen = () => {
    setRightDrawerOpen(true);
  };

  const handleAddTable = async () => {
    if (tableNumber && seatingCapacity) {
      const newTable: TableData = {
        number: parseInt(tableNumber),
        capacity: parseInt(seatingCapacity),
      };
      console.log("new table: ", newTable);
      try {
        const response = await postTable(newTable);
        console.log("response: ", response);
        setTables(response);
        console.log("Tables: ", tables);
        setTableNumber("");
        setSeatingCapacity("");
        handleRightDrawerClose();
      } catch (error) {
        console.error("Error adding table:", error);
      }
    }
  };

  const handleDeleteTable = async (tableNumber: number) => {
    try {
      const response = await deleteTable(tableNumber);
      if (response.success) {
        setTables(response.remainingTables);
      } else {
        console.error("Error deleting table:", response.message);
      }
    } catch (error) {
      console.error("Error deleting table:", error);
    }
  };

  const renderTable = (table: TableData) => {
    const TableComponent =
      {
        1: Table1,
        2: Table2,
        3: Table3,
        4: Table4,
        5: Table5,
        6: Table6,
        7: Table7,
        8: Table8,
      }[table.capacity] || Table4;

    return (
      <Box key={table.number} onClick={(e) => e.preventDefault()}>
        <Link href={`/order?table=${table.number}`} passHref>
          <TableComponent
            tableNumber={table.number}
            onDelete={(e: React.MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
              handleDeleteTable(table.number);
            }}
          />
        </Link>
      </Box>
    );
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Table Management
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            "Dashboard",
            "POS",
            "HR Directory",
            "Inventory",
            "Add Menu",
            "Menu",
          ].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index === 0 && <DashboardIcon />}
                  {index === 1 && <PointOfSaleIcon />}
                  {index === 2 && <FolderSharedIcon />}
                  {index === 3 && <InventoryIcon />}
                  {index === 4 && <AddCircleIcon />}
                  {index === 5 && <WidgetsIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="outlined" onClick={handleRightDrawerOpen}>
            Add Table
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            marginTop: 2,
          }}
        >
          {tables.map(renderTable)}
        </Box>
      </Main>
      <Drawer
        anchor="right"
        open={rightDrawerOpen}
        onClose={handleRightDrawerClose}
        sx={{
          "& .MuiDrawer-paper": {
            width: 300,
            padding: 2,
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={handleRightDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Add Table
          </Typography>
          <TextField
            label="Table Number"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            fullWidth
            margin="normal"
            type="number"
          />
          <TextField
            label="Seating Capacity"
            value={seatingCapacity}
            onChange={(e) => setSeatingCapacity(e.target.value)}
            fullWidth
            margin="normal"
            type="number"
          />
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
          >
            <Button
              variant="contained"
              onClick={handleAddTable}
              disabled={!tableNumber || !seatingCapacity}
            >
              Add Table
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
