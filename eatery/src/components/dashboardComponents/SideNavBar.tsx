"use client";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
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
import DashboardIcon from "@mui/icons-material/Dashboard";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import WidgetsIcon from "@mui/icons-material/Widgets";
import BasicPie from "@/components/dashboardComponents/Pie";
import BasicBarsOrder from "@/components/dashboardComponents/BarOrder";
import BasicBarsRevenue from "@/components/dashboardComponents/LineRevenue";
import Order from "@/components/dashboardComponents/Order";
import Revenue from "@/components/dashboardComponents/Revenue";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  // backgroundColor: "#e91e63",
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

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon sx={{ color: "white" }} />,
      path: "/dashboard",
    },
    {
      text: "POS",
      icon: <PointOfSaleIcon sx={{ color: "white" }} />,
      path: "/tableTry",
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
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: "none" },
              { color: "white" },
            ]}
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
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#f53e62",
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
                    backgroundColor: "#000000",
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
        <DrawerHeader />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Order />
          <BasicPie />
          <Revenue />
          
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop:"10vh"
          }}
        >
          <BasicBarsOrder />
          <BasicBarsRevenue />
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
