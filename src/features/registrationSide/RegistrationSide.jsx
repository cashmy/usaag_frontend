import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import makeStyles from '@mui/styles/makeStyles';
import Image from "../../assets/images/bg-image-title.png";

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
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      password: user.password,
      email: user.email,
    };
    try {
      // const response = await serviceLayer.registerUser(data);
      // console.log(response);
      // setUser({
      //   firstName: data.firstName,
      //   lastName: data.lastName,
      //   username: data.username,
      //   password: data.password,
      //   email: data.email,
      // phoneNumber: data.phoneNumber,

      // });
      // if (response.data.token !== null) {
      //   window.location.href = "/login";
      // }
    } catch (ex) {
      console.log("Error in API call", ex.response.data);
    }
  }

  const onChangeFirstName = (e) => {
    setUser({
      ...user,
      firstName: e.target.value,
    });
  };

  const onChangeLastName = (e) => {
    setUser({
      ...user,
      lastName: e.target.value,
    });
  };

  const onChangeEmail = (e) => {
    setUser({
      ...user,
      email: e.target.value,
    });
  };

  const onChangeUsername = (e) => {
    setUser({
      ...user,
      username: e.target.value,
    });
  };

  const onChangePassword = (e) => {
    setUser({
      ...user,
      password: e.target.value,
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registration
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2} className={classes.grid}>
              <Grid item xs={6}>
                <TextField
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  id="fname"
                  label="First Name"
                  name="fname"
                  value={user.firstName}
                  onChange={onChangeFirstName}
                  autoComplete="fname"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  id="lname"
                  label="Last Name"
                  name="lname"
                  value={user.lastName}
                  onChange={onChangeLastName}
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  id="userName"
                  label="UserName"
                  name="userName"
                  value={user.userName}
                  onChange={onChangeUsername}
                  autoComplete="userName"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={user.password}
                  onChange={onChangePassword}
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  type="email"
                  id="email"
                  label="Email"
                  name="email"
                  value={user.email}
                  onChange={onChangeEmail}
                  autoComplete="email"
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link component={RouterLink} to={""} variant="body2">
                  {"Already have an account? Sign In"}
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
