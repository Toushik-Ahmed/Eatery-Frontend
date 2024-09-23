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
import { Select, MenuItem } from "@mui/material";
import postTable from "@/services/tableServices/postTable";
import updateTable from "@/services/tableServices/updateTable";
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
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { placeOrder, tableStatus } from "@/redux/Pos/PlaceOrderSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

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
export interface TableStatus {
  tableNumber: number;
  tableStatus: string;
}

export interface TableStatusdb {
  tableNumber: number;
  status: string;
}

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
  status: string;
}

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [rightDrawerOpen, setRightDrawerOpen] = React.useState(false);
  const [tableStatusOpen, setTableStatusOpen] = React.useState(false);
  const [tableNumber, setTableNumber] = React.useState(0);
  const [tableNo, setTableNo] = React.useState(0);
  const [seatingCapacity, setSeatingCapacity] = React.useState("");
  const [tables, setTables] = React.useState<TableData[]>([]);
  const [status, setStatus] = React.useState("");
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await getTable();
      console.log("response: ", response);
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

  const list = useSelector((state: RootState) => state.placeOrder);

  useEffect(() => {
    console.log("Data:", list.orderDetails.tableNo);
  }, [list]);

  const handleRightDrawerClose = () => {
    setRightDrawerOpen(false);
  };

  const handleRightDrawerOpen = () => {
    setRightDrawerOpen(true);
  };

  const tableStatusDrawerClose = () => {
    setTableStatusOpen(false);
  };

  const tableStatusDrawerOpen = () => {
    setTableStatusOpen(true);
  };

  const handleAddTable = async () => {
    if (tableNumber && seatingCapacity) {
      const newTable: TableData = {
        number: tableNumber,
        capacity: parseInt(seatingCapacity),
        status: "free",
      };

      console.log("new table: ", newTable);
      try {
        const response = await postTable(newTable);
        console.log("response: ", response);
        setTables(response);
        console.log("Tables: ", tables);
        setTableNumber(0);
        setSeatingCapacity("");
        handleRightDrawerClose();
      } catch (error) {
        console.error("Error adding table:", error);
      }
    }
  };
  const handleTableStatus = async () => {
    const newTable: TableStatus = {
      tableNumber: tableNo,
      tableStatus: status,
    };
    dispatch(tableStatus(newTable));
  };

  const handleTableStatusdb = async () => {
    const tableStatus: TableStatusdb = {
      tableNumber: tableNo,
      status: status,
    };
    console.log("tableStatusdb: ", tableStatus);
    try {
      const response = await updateTable(tableStatus);
      console.log("response: ", response);
      fetchTables();
      // setTables(response);
      // console.log("Tables: ", tables);
      // setTableNumber(0);
      // setSeatingCapacity("");
      // handleRightDrawerClose();
    } catch (error) {
      console.error("Error adding table:", error);
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
            status={table.status}
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
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
          <Button
            variant="outlined"
            onClick={handleRightDrawerOpen}
            sx={{ mb: 1 }}
          >
            Add Table
          </Button>
          <Button
            variant="outlined"
            onClick={tableStatusDrawerOpen}
            sx={{ mb: 1 }}
          >
            Table Status
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
            onChange={(e) => setTableNumber(Number(e.target.value))}
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
      <Drawer
        anchor="right"
        open={tableStatusOpen}
        onClose={tableStatusDrawerClose}
        sx={{
          "& .MuiDrawer-paper": {
            width: 300,
            padding: 2,
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={tableStatusDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Table Status
          </Typography>
          <TextField
            label="Table Number"
            value={tableNo}
            onChange={(e) => setTableNo(Number(e.target.value))}
            fullWidth
            margin="normal"
            type="number"
          />
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
            displayEmpty
            sx={{
              marginTop: 2,
              marginBottom: 2,
            }}
          >
            <MenuItem value="" disabled>
              Select Status
            </MenuItem>
            <MenuItem value="Occupied">Occupied</MenuItem>
            <MenuItem value="Free">Free</MenuItem>
          </Select>
          {/* <TextField
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
            margin="normal"
            type="text"
          /> */}
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
          >
            <Button
              variant="contained"
              onClick={() => {
                handleTableStatus();
                handleTableStatusdb();
              }}
              disabled={!tableNo || !status}
            >
              Update Table Status
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
