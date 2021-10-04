import React, { Fragment, useState, useEffect } from "react";
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
  Tooltip,
  Typography,
  makeStyles,
} from "@material-ui/core";
// Icons
import AddIcon from "@material-ui/icons/Add";
// Child components
import CommonCardActions from "../../components/commonCardActions";
// Service Layer
import CohortService from "../../services/cohorts.service";

// * Styling
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
    // color: theme.palette.contrastText,
  },
  studentCard: {
    marginBottom: theme.spacing(3),
    backgroundColor: "#bdbdbd",
    color: theme.palette.primary.contrastText
  }
}));

// * Main Component
export default function CohortAssignment() {
  const classes = useStyles();
  // const [loadData, setLoadData] = useState(true);
  const [records, setRecords] = useState([]);
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

  useEffect(() => {
    getCohorts();
  }, [archiveStatus]);

  async function getCohorts(e) {
    console.log("Getting cohort data")
    try {
      const response = await CohortService.getCohortsBySts(archiveStatus);
      setRecords(response.data);
      // setLoadData(false);
    } catch (e) {
      console.log("API call unsuccessful", e);
    }
  }

  const handleToggle = () => {
    setArchiveStatus(!archiveStatus);
    // setLoadData(true)
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
  const handleDelete = (id) => {
    setConfirmDialog({
      isOpen: true,
      title:
        "Are you sure you want to delete this Cohort and all of its Detail?",
      subTitle: "You can't undo this action.",
      onConfirm: () => {
        onDelete(id);
      },
    })
  };
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
  // TODO: Update archive status
  const handleArchive = (item) => {
    // Changes the archive status of a given record
    // priorAuth.PAArchived = !archiveStatus;
    // PriorAuthService.updatePA(priorAuth);
    alert(`Changing archive status for ${item.abbreviation} - ${item.name}!`);
  };
  // TODO: handle student assignment here
  const handleAssign = (id) => {
  }

  return (
    <Fragment>
      <Grid container className={classes.root} spacing={1}>
        <Grid container className={classes.container} spacing={10}>
          {/* //* Header Bar */}
          <Grid item xs={10}>
            <Paper className={classes.paper}>
              <Toolbar>
                <Typography variant="h4">Cohort Assignments</Typography>
                <Tooltip title="Toggle archive status">
                  <FormControlLabel
                    className={classes.archiveSwitch}
                    control={
                      <Switch
                        aria-label="toggle archive status"
                        checked={archiveStatus}
                        onChange={handleToggle}
                        name="archivedStatus"
                      />
                    }
                    label="Archived"
                  />
                </Tooltip>
                <Tooltip title="Add a Cohort">
                  <Fab
                    className={classes.addButton}
                    color="primary"
                    aria-label="Add a cohort"
                    size="small"
                    onClick={() => {
                      //   setOpenPopup(true);
                      //   setRecordForEdit(null);
                    }}
                  >
                    <AddIcon />
                  </Fab>
                </Tooltip>
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
                {/* {console.log("Item:", item)} */}
                {records.map((item, index) => (
                  <Card
                    raised={true}
                    className={classes.cohortCard}
                    style={{ backgroundColor: `${item.cpkColor}`, color: `${item.textColor}` }}>
                    <CardHeader
                      title={item.abbreviation + " - " + item.name}
                      aria-label={`card for ${item.name}`} />
                    <CommonCardActions
                      archiveStatus={archiveStatus}
                      item={item}
                      handleArchive={handleArchive}
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                      handleAssign={handleAssign}
                      recordName="Cohort"
                      color={item.textColor}
                    />
                  </Card>
                ))}
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
