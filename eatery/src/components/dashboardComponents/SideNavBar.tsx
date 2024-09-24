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

const drawerWidth = 210;

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
  backgroundColor: "#e91e63",
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
            sx={[
              {
                mr: 2,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
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
          Eatery
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
              <ListItemButton
                sx={{
                  "&:hover": {
                    backgroundColor: "#00bcd4",
                    color: "white",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: "40px",
                  }}
                >
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
        <Divider />
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
          <Revenue />
          <BasicPie />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
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

// "use client";
// import * as React from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import CssBaseline from "@mui/material/CssBaseline";
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
// import FolderSharedIcon from "@mui/icons-material/FolderShared";
// import InventoryIcon from "@mui/icons-material/Inventory";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import WidgetsIcon from "@mui/icons-material/Widgets";
// import BasicPie from "@/components/dashboardComponents/Pie";
// import BasicBarsOrder from "@/components/dashboardComponents/BarOrder";
// import BasicBarsRevenue from "@/components/dashboardComponents/LineRevenue";
// import Order from "@/components/dashboardComponents/Order";
// import Revenue from "@/components/dashboardComponents/Revenue";

// const drawerWidth = 240;

// const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
//   open?: boolean;
// }>(({ theme, open }) => ({
//   flexGrow: 1,
//   padding: theme.spacing(3),
//   transition: theme.transitions.create("margin", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   marginLeft: `-${drawerWidth}px`,
//   ...(open && {
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     marginLeft: 0,
//   }),
// }));

// interface AppBarProps extends MuiAppBarProps {
//   open?: boolean;
// }

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })<AppBarProps>(({ theme, open }) => ({
//   transition: theme.transitions.create(["margin", "width"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   backgroundColor: "#ffffff",
//   color: "#333333",
//   boxShadow: "none",
//   borderBottom: "1px solid #e0e0e0",
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(["margin", "width"], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
//   justifyContent: "flex-end",
// }));

// export default function PersistentDrawerLeft() {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(true);
//   const [rightDrawerOpen, setRightDrawerOpen] = React.useState(false);

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   const handleRightDrawerOpen = () => {
//     setRightDrawerOpen(true);
//   };

//   const handleRightDrawerClose = () => {
//     setRightDrawerOpen(false);
//   };

//   return (
//     <Box sx={{ display: "flex", bgcolor: "#f5f5f5", minHeight: "100vh" }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{ mr: 2, ...(open && { display: "none" }) }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             Dashboard
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           "& .MuiDrawer-paper": {
//             width: drawerWidth,
//             boxSizing: "border-box",
//             backgroundColor: "#4264ED",
//             color: "#ffffff",
//           },
//         }}
//         variant="persistent"
//         anchor="left"
//         open={open}
//       >
//         <DrawerHeader>
//           <Typography variant="h6" sx={{ flexGrow: 1, color: "#ffffff" }}>
//             Eatery
//           </Typography>
//           <IconButton onClick={handleDrawerClose} sx={{ color: "#ffffff" }}>
//             {theme.direction === "ltr" ? (
//               <ChevronLeftIcon />
//             ) : (
//               <ChevronRightIcon />
//             )}
//           </IconButton>
//         </DrawerHeader>
//         <Divider sx={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
//         <List>
//           {[
//             { text: "Dashboard", icon: <DashboardIcon /> },
//             { text: "POS", icon: <PointOfSaleIcon /> },
//             { text: "HR Directory", icon: <FolderSharedIcon /> },
//             { text: "Inventory", icon: <InventoryIcon /> },
//             { text: "Add Menu", icon: <AddCircleIcon /> },
//             { text: "Menu", icon: <WidgetsIcon /> },
//           ].map((item) => (
//             <ListItem key={item.text} disablePadding>
//               <ListItemButton
//                 sx={{
//                   "&:hover": {
//                     backgroundColor: "rgba(255,255,255,0.1)",
//                   },
//                 }}
//               >
//                 <ListItemIcon sx={{ color: "#ffffff", minWidth: "40px" }}>
//                   {item.icon}
//                 </ListItemIcon>
//                 <ListItemText primary={item.text} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>
//       <Main open={open}>
//         <DrawerHeader />
//         <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
//           <Order />
//           <Revenue />
//           <BasicPie />
//         </Box>
//         <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
//           <BasicBarsOrder />
//           <BasicBarsRevenue />
//         </Box>
//       </Main>
//       <Drawer
//         anchor="right"
//         open={rightDrawerOpen}
//         onClose={handleRightDrawerClose}
//         sx={{
//           "& .MuiDrawer-paper": {
//             width: 300,
//             padding: 2,
//           },
//         }}
//       >
//         <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//           <IconButton onClick={handleRightDrawerClose}>
//             <ChevronRightIcon />
//           </IconButton>
//         </Box>
//       </Drawer>
//     </Box>
//   );
// }

// "use client";
// import * as React from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import CssBaseline from "@mui/material/CssBaseline";
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
// import FolderSharedIcon from "@mui/icons-material/FolderShared";
// import InventoryIcon from "@mui/icons-material/Inventory";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import WidgetsIcon from "@mui/icons-material/Widgets";
// import BasicPie from "@/components/dashboardComponents/Pie";
// import BasicBarsOrder from "@/components/dashboardComponents/BarOrder";
// import BasicBarsRevenue from "@/components/dashboardComponents/LineRevenue";
// import Order from "@/components/dashboardComponents/Order";
// import Revenue from "@/components/dashboardComponents/Revenue";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// const drawerWidth = 210;

// const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
//   open?: boolean;
// }>(({ theme, open }) => ({
//   flexGrow: 1,
//   padding: theme.spacing(2),
//   transition: theme.transitions.create("margin", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   marginLeft: `-${drawerWidth}px`,
//   ...(open && {
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     marginLeft: 0,
//   }),
// }));

// interface AppBarProps extends MuiAppBarProps {
//   open?: boolean;
// }

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })<AppBarProps>(({ theme, open }) => ({
//   transition: theme.transitions.create(["margin", "width"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   backgroundColor: "#e91e63",
//   color: "black",
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(["margin", "width"], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
//   justifyContent: "flex-end",
// }));

// const StyledCard = styled(Box)(({ theme }) => ({
//   backgroundColor: "#ffffff",
//   borderRadius: theme.shape.borderRadius,
//   boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//   padding: theme.spacing(1.5),
//   height: "100%",
// }));

// export default function PersistentDrawerLeft() {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(true);
//   const [rightDrawerOpen, setRightDrawerOpen] = React.useState(false);
//   const router = useRouter();

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   const handleRightDrawerOpen = () => {
//     setRightDrawerOpen(true);
//   };

//   const handleRightDrawerClose = () => {
//     setRightDrawerOpen(false);
//   };

//   const menuItems = [
//     { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
//     { text: "POS", icon: <PointOfSaleIcon />, path: "/" },
//     {
//       text: "HR Directory",
//       icon: <FolderSharedIcon />,
//       path: "/employee-list",
//     },
//     { text: "Inventory", icon: <InventoryIcon />, path: "/Inventory" },
//     { text: "Add Menu", icon: <AddCircleIcon />, path: "/" },
//     { text: "Menu", icon: <WidgetsIcon />, path: "/" },
//   ];

//   return (
//     <Box sx={{ display: "flex", bgcolor: "#f0f2f5", minHeight: "100vh" }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{ mr: 2, ...(open && { display: "none" }) }}
//           >
//             <MenuIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           "& .MuiDrawer-paper": {
//             width: drawerWidth,
//             boxSizing: "border-box",
//           },
//         }}
//         variant="persistent"
//         anchor="left"
//         open={open}
//       >
//         <DrawerHeader>
//           Eatery
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === "ltr" ? (
//               <ChevronLeftIcon />
//             ) : (
//               <ChevronRightIcon />
//             )}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List>
//           {menuItems.map((item) => (
//             <ListItem key={item.text} disablePadding>
//               <ListItemButton
//                 component={Link}
//                 href={item.path}
//                 sx={{
//                   "&:hover": {
//                     backgroundColor: "#f0f0f0",
//                   },
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     minWidth: "40px",
//                   }}
//                 >
//                   {item.icon}
//                 </ListItemIcon>
//                 <ListItemText primary={item.text} />
//               </ListItemButton>
//             </ListItem>
//           ))}

//           {/* {[
//             "Dashboard",
//             "POS",
//             "HR Directory",
//             "Inventory",
//             "Add Menu",
//             "Menu",
//           ].map((text, index) => (
//             <ListItem key={text} disablePadding>
//               <ListItemButton
//                 sx={{
//                   "&:hover": {
//                     backgroundColor: "#f0f0f0",
//                   },
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     minWidth: "40px",
//                   }}
//                 >
//                   {index === 0 && <DashboardIcon />}
//                   {index === 1 && <PointOfSaleIcon />}
//                   {index === 2 && <FolderSharedIcon /> path: "/employee-list"}
//                   {index === 3 && <InventoryIcon />}
//                   {index === 4 && <AddCircleIcon />}
//                   {index === 5 && <WidgetsIcon />}
//                 </ListItemIcon>
//                 <ListItemText primary={text} />
//               </ListItemButton>
//             </ListItem>
//           ))} */}
//         </List>
//         <Divider />
//       </Drawer>
//       <Main open={open}>
//         <DrawerHeader />
//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns: "repeat(12, 1fr)",
//             gap: 2,
//           }}
//         >
//           <Box sx={{ gridColumn: "span 4" }}>
//             <StyledCard>
//               <Order />
//             </StyledCard>
//           </Box>
//           <Box sx={{ gridColumn: "span 4" }}>
//             <StyledCard>
//               <Revenue />
//             </StyledCard>
//           </Box>
//           <Box sx={{ gridColumn: "span 4" }}>
//             <StyledCard>
//               <BasicPie />
//             </StyledCard>
//           </Box>
//           <Box sx={{ gridColumn: "span 6" }}>
//             <StyledCard>
//               <BasicBarsOrder />
//             </StyledCard>
//           </Box>
//           <Box sx={{ gridColumn: "span 6" }}>
//             <StyledCard>
//               <BasicBarsRevenue />
//             </StyledCard>
//           </Box>
//         </Box>
//       </Main>
//       <Drawer
//         anchor="right"
//         open={rightDrawerOpen}
//         onClose={handleRightDrawerClose}
//         sx={{
//           "& .MuiDrawer-paper": {
//             width: 300,
//             padding: 2,
//           },
//         }}
//       >
//         <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//           <IconButton onClick={handleRightDrawerClose}>
//             <ChevronRightIcon />
//           </IconButton>
//         </Box>
//       </Drawer>
//     </Box>
//   );
// }
