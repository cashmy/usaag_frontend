import React, { Fragment } from "react";
import clsx from "clsx";

import { Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((them) => ({}));

export default function CohortAssignment() {
  const classes = useStyles();

  return (
    <Fragment>
      <Grid container className={classes.root} spacing={1}>
        <Typography>Hello from Cohort Assignment</Typography>
      </Grid>
    </Fragment>
  );
}
