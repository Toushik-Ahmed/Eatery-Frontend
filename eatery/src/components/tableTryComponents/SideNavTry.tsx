import { tableStatus } from '@/redux/Pos/PlaceOrderSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { loggedInuser, LoggedInuser } from '@/services/apiservice';
import deleteTable from '@/services/tableServices/deleteTable';
import getTable from '@/services/tableServices/getTable';
import postTable from '@/services/tableServices/postTable';
import updateTable from '@/services/tableServices/updateTable';
import { removeToken } from '@/services/tokenServices';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import InventoryIcon from '@mui/icons-material/Inventory';
import MenuIcon from '@mui/icons-material/Menu';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { MenuItem, Select } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table1,
  Table2,
  Table3,
  Table4,
  Table5,
  Table6,
  Table7,
  Table8,
} from './tableTry';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
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
  backgroundColor: "#547494",
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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
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
  const [seatingCapacity, setSeatingCapacity] = React.useState('');
  const [tables, setTables] = React.useState<TableData[]>([]);
  const [status, setStatus] = React.useState('');
  const dispatch = useDispatch<AppDispatch>();

  //added

  const router = useRouter();
  const [label, setLabel] = React.useState('User Name');
  const [user, setUserInfo] = React.useState<LoggedInuser>();

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await loggedInuser();
        setUserInfo(userData);
        setLabel(userData.user.firstName);
        console.log(userData.user);
        console.log(userData.user.firstName);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, []);

  const handleLogOut = () => {
    removeToken();
    router.push('/login');
  };

  React.useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await getTable();
      console.log('response: ', response);
      setTables(response);
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon sx={{ color: 'white' }} />,
      path: '/dashboard',
    },
    {
      text: 'HR Directory',
      icon: <FolderSharedIcon sx={{ color: 'white' }} />,
      path: '/employee-list',
    },
    {
      text: 'Inventory',
      icon: <InventoryIcon sx={{ color: 'white' }} />,
      path: '/Inventory',
    },
    {
      text: 'Menu',
      icon: <WidgetsIcon sx={{ color: 'white' }} />,
      path: '/menubuilder',
    },
    {
      text: 'POS',
      icon: <PointOfSaleIcon sx={{ color: 'white' }} />,
      path: '/tableTry',
    },
  ];

  const list = useSelector((state: RootState) => state.placeOrder);

  useEffect(() => {
    console.log('Data:', list.orderDetails.tableNo);
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
        status: 'free',
      };

      console.log('new table: ', newTable);
      try {
        const response = await postTable(newTable);
        console.log('response: ', response);
        setTables(response);
        console.log('Tables: ', tables);
        setTableNumber(0);
        setSeatingCapacity('');
        handleRightDrawerClose();
      } catch (error) {
        console.error('Error adding table:', error);
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
    console.log('tableStatusdb: ', tableStatus);
    try {
      const response = await updateTable(tableStatus);
      console.log('response: ', response);
      fetchTables();
      // setTables(response);
      // console.log("Tables: ", tables);
      // setTableNumber(0);
      // setSeatingCapacity("");
      // handleRightDrawerClose();
    } catch (error) {
      console.error('Error adding table:', error);
    }
  };

  const handleDeleteTable = async (tableNumber: number) => {
    try {
      const response = await deleteTable(tableNumber);
      if (response.success) {
        setTables(response.remainingTables);
      } else {
        console.error('Error deleting table:', response.message);
      }
    } catch (error) {
      console.error('Error deleting table:', error);
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
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[
                {
                  mr: 2,
                },
                open && { display: 'none' },
                { color: 'white' },
              ]}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ color: 'white' }}
            >
              Table Management
            </Typography>
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth size="small">
              <Select
                labelId="user-menu-label"
                id="user-menu"
                value=""
                onChange={(event) => {
                  if (event.target.value === 'logout') {
                    handleLogOut();
                  }
                }}
                displayEmpty
                renderValue={() => label}
                sx={{
                  backgroundColor: '#ffffff',
                  color: 'black',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '& .MuiSelect-select': {
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
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#d91a40',
            color: '#ffffff',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#ffffff' }}>
            Eatery
          </Typography>
          <IconButton onClick={handleDrawerClose} sx={{ color: '#ffffff' }}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                sx={{
                  '&:hover': {
                    backgroundColor: '#000000',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: '40px',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* <List>
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
        </List> */}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
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
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
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
          '& .MuiDrawer-paper': {
            width: 300,
            padding: 2,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
            sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}
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
          '& .MuiDrawer-paper': {
            width: 300,
            padding: 2,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
            sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}
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
