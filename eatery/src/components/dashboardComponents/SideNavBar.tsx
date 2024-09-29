"use client";
import BasicBarsOrder from "@/components/dashboardComponents/BarOrder";
import BasicBarsRevenue from "@/components/dashboardComponents/LineRevenue";
import Order from "@/components/dashboardComponents/Order";
import BasicPie from "@/components/dashboardComponents/Pie";
import Revenue from "@/components/dashboardComponents/Revenue";
import BasicColor from "./Try";
import { loggedInuser, LoggedInuser } from "@/services/apiservice";
import { removeToken } from "@/services/tokenServices";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import InventoryIcon from "@mui/icons-material/Inventory";
import MenuIcon from "@mui/icons-material/Menu";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import WidgetsIcon from "@mui/icons-material/Widgets";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";


const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "#169880",

  color: "black",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [rightDrawerOpen, setRightDrawerOpen] = React.useState(false);
  const router = useRouter();
  //added
  const [label, setLabel] = React.useState("User Name");
  const [user, setUserInfo] = React.useState<LoggedInuser>();

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await loggedInuser();
        setUserInfo(userData);
        setLabel(userData.user.firstName);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleRightDrawerOpen = () => {
    setRightDrawerOpen(true);
  };

  const handleRightDrawerClose = () => {
    setRightDrawerOpen(false);
  };
  //added
  const handleLogOut = () => {
    removeToken();
    router.push("/");
  };

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon sx={{ color: "white" }} />,
      path: "/dashboard",
    },
    {
      text: "HR Directory",
      icon: <FolderSharedIcon sx={{ color: "white" }} />,
      path: "/employee-list",
    },

    {
      text: "Inventory",
      icon: <InventoryIcon sx={{ color: "white" }} />,
      path: "/Inventory",
    },
    {
      text: "Menu",
      icon: <WidgetsIcon sx={{ color: "white" }} />,
      path: "/menubuilder",
    },
    {
      text: "POS",
      icon: <PointOfSaleIcon sx={{ color: "white" }} />,
      path: "/tableTry",
    },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[{ mr: 2 }, open && { display: "none" }, { color: "white" }]}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ color: "white" }}
            >
              Admin Dashboard
            </Typography>
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth size="small">
              <Select
                labelId="user-menu-label"
                id="user-menu"
                value=""
                onChange={(event) => {
                  if (event.target.value === "logout") {
                    handleLogOut();
                  }
                }}
                displayEmpty
                renderValue={() => label}
                sx={{
                  backgroundColor: "#ffffff",
                  color: "black",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "& .MuiSelect-select": {
                    paddingLeft: 2,
                    paddingY: 1,
                  },
                }}
              >
                <MenuItem value="logout">Log out</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#d91a40",
            color: "#ffffff",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#ffffff" }}>
            Eatery
          </Typography>
          <IconButton onClick={handleDrawerClose} sx={{ color: "#ffffff" }}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                sx={{
                  "&:hover": {
                    backgroundColor: "#1D1842",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: "40px",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <div className="flex flex-col gap-6 mt-[8vh]">
          {/* First row: Order and Revenue components aligned vertically */}
          <div className="flex justify-around items-start">
            <Order />
            <Revenue />
            <Order />
            <Revenue />
          </div>

          {/* Second row: BasicColor components aligned vertically */}
          <div className="flex items-start gap-2">
            <BasicColor />
            <BasicColor />
            <div>
              <BasicPie />
            </div>
          </div>

          {/* Third row: BasicBars components aligned vertically */}
          <div className="flex justify-between items-start">
            <BasicBarsOrder />
            <BasicBarsRevenue />
          </div>
        </div>
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
      </Drawer>
    </Box>
  );
}
