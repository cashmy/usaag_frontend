import React, { Fragment, useState } from "react";
// import clsx from "clsx";
import {
  Card,
  CardHeader,
  CardContent,
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
  cohortCard: {
    marginBottom: theme.spacing(3),
    // backgroundColor: "#bdbdbd"
  },
  studentCard: {
    marginBottom: theme.spacing(3),
    backgroundColor: "#bdbdbd",
    color: theme.palette.primary.contrastText
  }
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
          {/* Header Bar */}
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

          {/* //* CARDS */}
          {/* Cohorts */}
          <Grid item xs={3}>
            <Card>
              <CardHeader title="Cohorts" />
              <CardContent>

                <Card raised={true} className={classes.cohortCard} style={{backgroundColor: "red"}}>
                  <CardContent>
                    <Typography>Cohort 1</Typography>
                  </CardContent>
                </Card>
                <Card raised={true} className={classes.cohortCard} style={{backgroundColor: "blue"}}>
                  <CardContent>
                    <Typography>Cohort 2</Typography>
                  </CardContent>
                </Card>
                <Card raised={true} className={classes.cohortCard} style={{backgroundColor: "green"}}>
                  <CardContent>
                    <Typography>Cohort 3</Typography>
                  </CardContent>
                </Card>
                <Card raised={true} className={classes.cohortCard} style={{backgroundColor: "purple"}}>
                  <CardContent>
                    <Typography>Cohort 4</Typography>
                  </CardContent>
                </Card>

              </CardContent>
            </Card>
          </Grid>

          {/* Cohort Members */}
          <Grid item xs={3}>
            <Card>
              <CardHeader title="Cohort Members" subheader="Count: 2" />
              <CardContent>
                {/* <Typography>Student Cards go here</Typography> */}
                <Card raised={true} className={classes.studentCard}>
                  <CardContent>
                    <Typography>Assigned Student card 1</Typography>
                  </CardContent>
                </Card>
                <Card raised={true} className={classes.studentCard}>
                  <CardContent>
                    <Typography>Assigned Student card 2</Typography>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </Grid>

          {/* Unassigned Students */}
          <Grid item xs={3}>
            <Card>
              <CardHeader title="UnAssigned Students" subheader="Count: 1"/>
              <CardContent>
                {/* <Typography>Student Cards go here</Typography> */}
                <Card raised={true} className={classes.studentCard}>
                  <CardContent>
                    <Typography>Student card</Typography>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
}
