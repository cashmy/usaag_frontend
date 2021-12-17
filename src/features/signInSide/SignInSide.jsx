import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";

import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import makeStyles from '@mui/styles/makeStyles';
import Image from "../../assets/images/bg-image-title.png";

// import jwtDecode from "jwt-decode";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${Image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();

  const [userLogin, setUserLogin] = useState({
    username: "",
    password: "",
  });
  const [user, setUser] = useState();

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      username: userLogin.username,
      password: userLogin.password,
    };
    try {
      // const response = await ServiceLayer.userLogin(data);
      // console.log(response);
      console.log("simulated access to user info");
      // if (response.data.token !== null) {
      //   let token = response.data.token;
      //   window.localStorage.setItem("token", token);
      //   setUserLogin({
      //     username: data.username,
      //     password: data.password,
      //   });
      //   const jwt = localStorage.getItem("token");
      //   const userInfo = jwtDecode(jwt);
      //   setUser(userInfo);

      // TODO: Determine if user is Student or instructor, then display appropriate home page
      // window.location.href = "/dashboard";
      // } else {
      //   console.log("User token is undefined.");
      // }
    } catch (ex) {
      console.log("** Ensure your server is running!! **");
      console.log("Error in API call", ex);
      alert("Incorrect Username or Password. Try again.");
    }
  }

  const onChangeUsername = (e) => {
    setUserLogin({
      ...userLogin,
      username: e.target.value,
    });
  };

  const onChangePassword = (e) => {
    setUserLogin({
      ...userLogin,
      password: e.target.value,
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={userLogin.username}
              onChange={onChangeUsername}
              autoComplete="username"
              autoFocus
            />
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={userLogin.password}
              onChange={onChangePassword}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  component={RouterLink}
                  to={"registration"}
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            {/* <Box mt={5}>
              <Copyright />
            </Box> */}
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
