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
import CommonCardActions from "../../components/commonCardActions";

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
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const handleToggle = () => {
    setArchiveStatus(!archiveStatus);
    // Request rerender
  };
  const handleEdit = (record) => {
    console.log("Record param: ", record);
    // history.push({
    //   pathname: "/template",
    //   state: {
    //     recordForEdit: record,
    //   },
    // });
  };
  const handleDelete = (id) =>{
    setConfirmDialog({
      isOpen: true,
      title:
        "Are you sure you want to delete this Cohort and all of its Detail?",
      subTitle: "You can't undo this action.",
      onConfirm: () => {
        onDelete(id);
      },
    })
  }

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    // deleteTemplateHeader(id);
    // setLoadData(!loadData);
    setNotify({
      isOpen: true,
      message: "Record deleted",
      type: "error",
    });
  };
  // Changes the archive status of a given record
  const handleArchive = (id) => {
    // priorAuth.PAArchived = !archiveStatus;
    // PriorAuthService.updatePA(priorAuth);
    alert(`Changing archive status for ${id}!`);
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
                {/* Map cohort cards here */}
                <Card raised={true} className={classes.cohortCard} style={{ backgroundColor: "red" }}>
                  <CardHeader title="Cohort 1" />
                  <CommonCardActions 
                    archiveStatus={archiveStatus}
                    item={'1'}
                    handleArchive={handleArchive}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    recordName="Cohort"
                  />
                </Card>
                <Card raised={true} className={classes.cohortCard} style={{ backgroundColor: "blue" }}>
                <CardHeader title="Cohort 2" />
                  <CommonCardActions 
                    archiveStatus={archiveStatus}
                    item={'2'}
                    handleArchive={handleArchive}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    recordName="Cohort"
                  />
                </Card>
                <Card raised={true} className={classes.cohortCard} style={{ backgroundColor: "green" }}>
                  <CardContent>
                    <Typography>Cohort 3</Typography>
                  </CardContent>
                </Card>
                <Card raised={true} className={classes.cohortCard} style={{ backgroundColor: "purple" }}>
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
              <CardHeader title="UnAssigned Students" subheader="Count: 1" />
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
