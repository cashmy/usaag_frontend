import React, { useEffect, useState } from "react";

import "./App.css";

// Main Routing and Navigaion
import { Switch, Route, Redirect, Link as RouterLink } from "react-router-dom";
import jwtDecode from "jwt-decode";

import clsx from "clsx";
// import { makeStyles, useTheme } from "@material-ui/core/styles";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
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
  makeStyles,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// mport ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PeopleIcon from "@material-ui/icons/People";
import MenuBookIcon from "@material-ui/icons/MenuBook";
// import PersonAddIcon from "@material-ui/icons/PersonAdd";
import HomeIcon from "@material-ui/icons/Home";
import PrintIcon from "@material-ui/icons/Print";
import AccountTreeIcon from "@material-ui/icons/AccountTree";

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
import ComponentTester from "./features/componentTester/componentTester";
// import { PauseCircleFilledTwoTone } from "@material-ui/icons";

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
    color: theme.palette.primary.contrastText,
  },
  drawerPaperLight: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
  listItemIcon: {
    color: theme.palette.primary.contrastText,
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

export default function App() {
  const classes = useStyles();
  // State variables
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState();
  const [initialLogin, setInitialLogin] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

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

  // Theme definitions
  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        dark: "#ad4d18",
        main: "#f86e23",
        light: "#f98b4f",
      },
      secondary: {
        dark: "#00a152",
        main: "#00e676",
        light: "#33eb91",
      },
      tertiary: {
        dark: "#9500ae",
        main: "#d600f9",
        light: "@dd33fa",
      },
      info: {
        dark: "#9e9e9e",
        main: "#bdbdbd",
        light: "#e0e0e0",
      },
    },
  });

  const lightTheme = createTheme({
    palette: {
      tertiary: {
        dark: "#9500ae",
        main: "#d600f9",
        light: "@dd33fa",
      },
    },
  });

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

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <div className={classes.root}>
        <CssBaseline />

        {/* AppBar */}
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
            >
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
              >
                <PowerSettingsNewIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>

        {/* Drawer */}
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
            <IconButton onClick={handleDrawerClose}>
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

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Paper
            className={clsx(classes.paperContainer, {
              [classes.paperContainerDark]: darkMode,
              [classes.paperContainerLight]: !darkMode,
            })}
          >
            <Switch>
              <Route
                path="/profile"
                render={(props) => {
                  if (!user) {
                    return <Redirect to="/login" />;
                  } else {
                    return;
                  }
                }}
              />
              <Route
                exact={true}
                path="/registration"
                component={RegistrationSide}
              />
              <Route path="/instDashBoard" component={InstDashBoard} />
              <Route path="/cohortAssignment" component={CohortAssignment} />
              <Route path="/template" component={Template} />
              <Route path="/templateTable" component={TemplateTable} />
              <Route path="/curriculumThemes" component={CurriculumThemeTable} />
              <Route path="/curriculumDetail" component={CurriculumDetail} />
              <Route path="/componentTester" component={ComponentTester} />
              <SignInSide />
            </Switch>
          </Paper>
        </main>
      </div>
    </ThemeProvider>
  );
}
