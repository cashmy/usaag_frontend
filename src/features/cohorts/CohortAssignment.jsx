import React, { Fragment, useState } from "react";
import clsx from "clsx";
import {
  Fab,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
// Icons
import AddIcon from "@material-ui/icons/Add";

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
  addButton: {
    position: "absolute",
    right: "10px",
  },
  archiveSwitch: {
    position: "absolute",
    right: "10%",
  },
}));

export default function CohortAssignment() {
  const classes = useStyles();
  const [archiveStatus, setArchiveStatus] = useState(false);

  const handleToggle = () => {
    setArchiveStatus(!archiveStatus);
    // Request rerender
  };

  return (
    <Fragment>
      <Grid container className={classes.root} spacing={1}>
        <Grid container className={classes.container} spacing={10}>
          <Grid item xs={10}>
            <Paper className={classes.paper}>
              <Toolbar>
                <Typography variant="h4">Cohort Assignments</Typography>
                <FormControlLabel
                  className={classes.archiveSwitch}
                  control={
                    <Switch
                      checked={archiveStatus}
                      onChange={handleToggle}
                      name="archivedStatus"
                    />
                  }
                  label="Archived"
                />
                <Fab
                  className={classes.addButton}
                  color="primary"
                  aria-label="add"
                  size="small"
                  onClick={() => {
                    //   setOpenPopup(true);
                    //   setRecordForEdit(null);
                  }}
                >
                  <AddIcon />
                </Fab>
              </Toolbar>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
}
