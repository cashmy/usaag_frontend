// Main App.jsx
// Author: Cash Myers
// Date: Feb 25, 2021

import React, { useEffect, useState } from "react";

import "./App.css";

// Main Routing and Navigaion
import { Routes, Route, Navigate, Link as RouterLink } from "react-router-dom";
import jwtDecode from "jwt-decode";

import clsx from "clsx";
// import { makeStyles, useTheme } from "@mui/material/styles";
// import { createTheme, ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  FormControlLabel,
  IconButton,
  List,
  Paper,
  Switch as MuiSwitch,
  Toolbar,
  Typography,
} from "@mui/material";

import makeStyles from '@mui/styles/makeStyles';

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// mport ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import MenuBookIcon from "@mui/icons-material/MenuBook";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HomeIcon from "@mui/icons-material/Home";
import PrintIcon from "@mui/icons-material/Print";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

import BackgroundImage from "./assets/images/bg-image-dark.png";
import BackgroundImageLight from "./assets/images/bg-image-light.png";

// Views for Routing
import RegistrationSide from "./features/registrationSide/RegistrationSide";
import SignInSide from "./features/signInSide/SignInSide";
import InstDashBoard from "./features/dashboards/InstDashboard";
import CohortAssignment from "./features/cohorts/CohortAssignment";
import Template from "./features/template/Template";
import TemplateTable from "./features/template/TemplateTable";
import CurriculumThemeTable from "./features/curriculums/CurriculumThemeTable";
import CurriculumDetail from "./features/curriculums/CurriculumDetailTable";
// import ComponentTester from "./features/componentTester/componentTester";
import CurrDtlByTmpHdrTable from "./features/curriculums/CurrDtlByTmpHdrTable";
// import { PauseCircleFilledTwoTone } from "@mui/icons-material";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerPaperDark: {
    backgroundColor: "#090909",
    color: theme.palette.primary,
  },
  drawerPaperLight: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
  listItemIcon: {
    color: "#fff",
  },
  drawerPaperOpen: {
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    // width: theme.breakpoints.up(),
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  paperContainerDark: {
    backgroundImage: `url(${BackgroundImage})`,
  },
  paperContainerLight: {
    backgroundImage: `url(${BackgroundImageLight})`,
  },
  paperContainer: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    height: "100vh",
  },
  darkModeSwitch: {
    position: "absolute",
    right: "5%",
  },
  logOut: {
    position: "absolute",
    right: "10px",
  },
}));

export default function App(props) {
  const { darkMode, setDarkMode } = props;
  const classes = useStyles();
  // State variables
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState();
  const [initialLogin, setInitialLogin] = useState(true);

  // Helper functions
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuClose = () => {
    localStorage.removeItem("token");
    window.location.href = "login";
  };

  // Initialization on Component Load/Render
  useEffect(() => {
    const jwt = localStorage.getItem("token");
    try {
      setUser(jwtDecode(jwt));
      setInitialLogin(false);
      setOpen(true);
    } catch (e) {
      setInitialLogin(true);
      setOpen(false);
    }
  }, []);
  // * Verified ThemeProvider at root level for MUI Migration v4 -> v5
  return (
    // <StyledEngineProvider injectFirst>
    //   <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
    <div className={classes.root}>
      <CssBaseline />

      {/* //* AppBar */}
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
          [classes.drawerPaperDark]: darkMode,
          [classes.drawerPaperLight]: !darkMode,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
            size="large">
            <MenuIcon />
          </IconButton>
          {/* // TODO: Place Logo/Avatar here */}
          <Typography variant="h6" noWrap>
            dCC User Stories At A Glance (USAAG)
          </Typography>
          <FormControlLabel
            className={classes.darkModeSwitch}
            control={
              <MuiSwitch
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              // color="palette.text.primary"
              />
            }
            label="Dark Mode"
          />
          {initialLogin === true && (
            <IconButton
              className={classes.logOut}
              color="inherit"
              onClick={handleMenuClose}
              size="large">
              <PowerSettingsNewIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* //* Drawer */}
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerPaperOpen]: open,
          [classes.drawerPaperClose]: !open,
          [classes.drawerPaperDark]: darkMode,
          [classes.drawerPaperLight]: !darkMode,
        })}
        classes={{
          paper: clsx({
            [classes.drawerPaperOpen]: open,
            [classes.drawerPaperClose]: !open,
            [classes.drawerPaperDark]: darkMode,
            [classes.drawerPaperLight]: !darkMode,
          }),
        }}
      >


        <div className={classes.toolbar}>
          {/* // TODO: place Logo here  */}
          <IconButton onClick={handleDrawerClose} size="large">
            {/* {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  )} */}
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <Divider />
        <List>
          {/* Home - Dashboard */}
          <ListItem button component={RouterLink} to={"instDashBoard"}>
            <ListItemIcon className={classes.listItemIcon}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          {/* Cohorts */}
          <ListItem button component={RouterLink} to={"cohortAssignment"}>
            <ListItemIcon className={classes.listItemIcon}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Cohorts" />
          </ListItem>
          {/* Curriculum */}
          <ListItem button component={RouterLink} to={"curriculumThemes"}>
            <ListItemIcon className={classes.listItemIcon}>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary="Curriculum" />
          </ListItem>
          {/* Projects s */}
          <ListItem button key="Projects">
            <ListItemIcon className={classes.listItemIcon}>
              <AccountTreeIcon />
            </ListItemIcon>
            <ListItemText primary="Projects" />
          </ListItem>{" "}
          {/* Templates */}
          <ListItem button component={RouterLink} to={"templateTable"}>
            <ListItemIcon className={classes.listItemIcon}>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Templates" />
          </ListItem>
        </List>
        <Divider />
        <List>
          {/* Reports */}

          <ListItem button key="Reports">
            <ListItemIcon className={classes.listItemIcon}>
              <PrintIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>
        </List>
      </Drawer>

      {/* // *Routing */}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Paper
          className={clsx(classes.paperContainer, {
            [classes.paperContainerDark]: darkMode,
            [classes.paperContainerLight]: !darkMode,
          })}
        >
          <Routes>
            <Route
              path="/profile"
            render={(props) => {
              if (!user) {
                return <Navigate to="/login" />;
              } else {
                return;
              }
            }}
            />
            <Route path="/" element={<SignInSide />} />
            <Route
              exact={true}
              path="/registration"
              element={<RegistrationSide />}
            />
            <Route path="/instDashBoard" element={<InstDashBoard />} />
            <Route path="/cohortAssignment" element={<CohortAssignment />} />
            <Route path="/template" element={<Template />} />
            <Route path="/templateTable" element={<TemplateTable />} />
            <Route path="/curriculumThemes" element={<CurriculumThemeTable />} />
            <Route path="/curriculumDetail" element={<CurriculumDetail />} />
            <Route path="/currDtlByTmp" element={<CurrDtlByTmpHdrTable />} />
            {/* <Route path="/componentTester" element={ComponentTester} /> */}
            {/* Temporary call to component until Auth is added */}
          </Routes>
        </Paper>
      </main>
    </div>
    //   </ThemeProvider>
    // </StyledEngineProvider>
  );
}
