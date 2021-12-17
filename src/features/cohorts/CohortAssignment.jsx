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
} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
// Icons
import AddIcon from "@mui/icons-material/Add";
// Child components
import CommonCardActions from "../../components/commonCardActions";
import Controls from "../../components/controls/Controls";
import CohortForm from "./CohortForm";
// Service Layer
import CohortService from "../../services/cohorts.service";
import StudentService from "../../services/students.service";
import { Scrollbars } from 'react-custom-scrollbars'

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
  // State Variables
  const classes = useStyles();
  // const scrollable = useScrollable();
  const [loadData, setLoadData] = useState(true);
  const [loadStudentData, setLoadStudentData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  const [records, setRecords] = useState([]);
  const [studentRecords, setStudentRecords] = useState([])
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
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
  }, [archiveStatus, loadData]);

  useEffect(() => {
    getAllUnassignedStudents();
  }, [loadStudentData])

  const getCohorts = async (e) => {
    console.log("Cohorts - Inside getCohorts")
    try {
      setIsLoading(true);
      const response = await CohortService
        .getCohortsBySts(archiveStatus)
        .then();
      setRecords(response.data)
      setIsLoading(false)
    } catch (e) {
      console.log("Cohorts API call unsuccessful:", e);
    }
  }
  const getAllUnassignedStudents = async (e) => {
    try {
      setIsLoadingStudents(true);
      const response = await StudentService
        .getUnassignedStudents();
      setStudentRecords(response.data)
      setIsLoadingStudents(false);
    } catch (e) {
      console.log("Students API call unsuccessful: ", e)
    }
  }

  const addOrEdit = (cohort, resetForm) => {
    if (cohort.id === 0) {
      CohortService.addCohort(cohort);
      setLoadData(!loadData); // Request reload of data
    } else {
      CohortService.updateCohort(cohort);
      setLoadData(!loadData); // Request reload of data
    }
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false); // Close Popup modal
    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "success",
    });
  };
  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };
  const handleToggle = () => {
    setArchiveStatus(!archiveStatus);
  };
  const handleEdit = (record) => {
    openInPopup(record)
  };
  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    CohortService.deleteCohort(id)
    setLoadData(!loadData); // Request reload of data
    setNotify({
      isOpen: true,
      message: "Record deleted",
      type: "error",
    });
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
  const handleArchive = (item) => {
    CohortService.patchCohortSts(item.id, !archiveStatus)
    setLoadData(!loadData); // Request reload of data
    setNotify({
      isOpen: true,
      message: "Archive status changed",
      type: "success",
    });
  };
  // TODO: handle student assignment here
  const handleAssign = (id) => {
  }

  return (
    <Fragment>
      <Grid container className={classes.root} spacing={1}>
        <Grid container className={classes.container} spacing={2}>
          {/* //* Header Bar */}
          <Grid item xs={11}>
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
                      setOpenPopup(true);
                      setRecordForEdit(null);
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
              <CardHeader title="Cohorts" subheader={`Count: ${records.length}`} />
              <Scrollbars
                style={{ height: '70vh' }}
              >
                <CardContent>

                  {/* Map cohort cards here */}
                  {isLoading ? (
                    <Typography> Loading ... </Typography>
                  ) : (
                    records.map((item, index) => (
                      <Card
                        key={index}
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
                    ))
                  )
                  }

                </CardContent>
              </Scrollbars>
            </Card>
          </Grid>

          {/* Cohort Members */}
          <Grid item xs={4}>
            <Card>
              <CardHeader title="Cohort Members" subheader="Count: 2" />
              <Scrollbars
                style={{ height: '70vh' }}
              >
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
              </Scrollbars>
            </Card>
          </Grid>

          {/* Unassigned Students */}
          <Grid item xs={4}>
            <Card>
              <CardHeader title="UnAssigned Students" subheader={`Count: ${studentRecords.length}`} />
              <Scrollbars
                style={{ height: '70vh' }}
              >
                <CardContent>
                  {/* <Typography>Student Cards go here</Typography> */}
                  {/* Map cohort cards here */}
                  {isLoadingStudents ? (
                    <Typography> Loading Students ... </Typography>
                  ) : (studentRecords.length == 0 ? (
                    <Typography> No new students available </Typography>
                  ) : (
                    studentRecords.map((item, index) => (
                      <Card raised={true} className={classes.studentCard}>
                        <CardContent>
                          <Typography key={index} > {item.firstName} {item.lastName} </Typography>
                        </CardContent>
                      </Card>
                    )))
                  )
                  }
                  {/* <Typography>Student card</Typography> */}
                </CardContent>
              </Scrollbars>
            </Card>
          </Grid>

        </Grid>
      </Grid>

      {/* //* POP-ups and Notifications */}
      <Controls.Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Cohort Form"
      >
        <CohortForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Controls.Popup>
      <Controls.Notification notify={notify} setNotify={setNotify} />
      <Controls.ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </Fragment>
  );
}
