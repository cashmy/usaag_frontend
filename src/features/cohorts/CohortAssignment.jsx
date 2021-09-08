import React, { Fragment } from "react";
import clsx from "clsx";

import { Grid, Paper, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(4),
    justifyContent: "center",
    display: "flex",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    display: "flex",
    flexDirection: "column",
  },
}));

export default function CohortAssignment() {
  const classes = useStyles();

  return (
    <Fragment>
      <Grid container className={classes.root} spacing={1}>
        <Grid container className={classes.container} spacing={10}>
          <Grid item xs={10}>
            <Paper className={classes.paper}>
              <Typography variant="h4">Cohort Assignments</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
}
