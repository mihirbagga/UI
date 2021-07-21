import React from 'react';
import clsx from 'clsx';
import APPCONFIG from '../../constants/appConfig';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
 

  
import { FaHome, FaNetworkWired, FaTools, FaPencilAlt, FaToolbox, FaLink} from "react-icons/fa";
   
import { FiPower } from "react-icons/fi";
import { Link } from 'react-router-dom';
import './index.scss'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 40,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxShadow: '1px 0 2px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',
    wordBreak: 'break-word'
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflow: 'hidden',
    width: '65px !important',
    boxShadow: '1px 0 2px rgba(0, 0, 0, 0.15)',
    wordBreak: 'break-word'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  listItemIcon: {
    paddingLeft: 8,
    paddingRight: 20,
    minWidth: 40,
    fontSize: 20,
    color: '#303f9f'
  },
  headerBar: {
    background: '#fff',
    color: '#3c4e9e',
    fontWeight: 'bold',
    fontSize: 20
  },
  listWrapper: {
    height: 'calc(100% - 50px)',
    overflowX: 'hidden',
    overflowY: 'auto'
  },
  listItemText: {
    color: '#303f9f',
    fontWeight: '600'
  },
}));

export default function Sidebar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        color="transparent"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.headerBar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <Link to="/app/home">
              {APPCONFIG.brand}
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        onMouseEnter={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <div className='side-menu'>
        {/* Menu Items */}
        <List className={classes.listWrapper}>
          <ListItem button component={Link} to="/app/home">
            <ListItemIcon className={classes.listItemIcon}><FaHome /></ListItemIcon>
            <ListItemText classes={{primary: classes.listItemText}} primary={'Home'} />
          </ListItem>
          <ListItem button component={Link} to="/app/connector">
            <ListItemIcon className={classes.listItemIcon}><FaNetworkWired /></ListItemIcon>
            <ListItemText classes={{primary: classes.listItemText}} primary={'Connector'} />
          </ListItem>
          <ListItem button component={Link} to="/app/configuration">
            <ListItemIcon className={classes.listItemIcon}><FaTools /></ListItemIcon>
            <ListItemText classes={{primary: classes.listItemText}} primary={'Configuration'} />
          </ListItem>
          <ListItem button component={Link} to="/app/limsConfig">
            <ListItemIcon className={classes.listItemIcon}><FaToolbox /></ListItemIcon>
            <ListItemText classes={{primary: classes.listItemText}} primary={'LIMS Config'} />
          </ListItem>
          <ListItem button component={Link} to="/app/injestionConfig">
            <ListItemIcon className={classes.listItemIcon}><FaPencilAlt /></ListItemIcon>
            <ListItemText classes={{primary: classes.listItemText}} primary={'Injestion Config'} />
          </ListItem>
 
          <ListItem  component={"a"} href="http://demo.mareana.com/SPECTRA/login?app=ELIMNS" target="_blank"/>
  
          <ListItem  component={"a"} href="http://demo.mareana.com/SPECTRA/login?app=ELIMNS" target="_blank" >
   
            <ListItemIcon className={classes.listItemIcon}><FaLink /></ListItemIcon>
            <ListItemText classes={{primary: classes.listItemText}} primary={'Harmonization'} />
          </ListItem>
        </List>
        {/* href="http://demo.mareana.com/SPECTRA/login?app=ELIMNS" target="_blank" harmonization link*/}
        {/* Menu Items END*/}
        </div>
        <div className='side-footer'>
          {/* App Logout */}
        <List>
        <Divider />
          <ListItem button component={Link} to="/user/login" onClick={()=>{localStorage.clear()}}>
            <ListItemIcon className={classes.listItemIcon}><FiPower /></ListItemIcon>
            <ListItemText classes={{primary: classes.listItemText}} primary={'Logout'} />
          </ListItem>
        </List>
        {/* App Logout END */}
        </div>
      </Drawer>
    </div>
  );
}