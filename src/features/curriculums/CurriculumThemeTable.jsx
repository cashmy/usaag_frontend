import React, { Fragment, useState, useEffect } from "react";
import {
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
import Controls from "../../components/controls/Controls";
import CurriculumThemeForm from "./CurriculumThemeForm";
// Service Layer
import CurriculumThemesService from "../../services/curriculumThemes.service";
// import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

// import { Scrollable, useScrollable } from 'nice-scrollbars';

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
}));

// * Main Component
export default function CurriculumThemeTable() {
  // State Variables
  const classes = useStyles();
  // const scrollable = useScrollable();
  const [loadData, setLoadData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState([]);
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
    getCurriculumThemes();
  }, [archiveStatus, loadData]);

  const getCurriculumThemes = async (e) => {
    try {
      setIsLoading(true);
      const response = await CurriculumThemesService
        .getCurriculumThemesBySts(archiveStatus)
        .then();
      setRecords(response.data)
      setIsLoading(false)
    } catch (e) {
      console.log("API call unsuccessful", e);
    }
  }

  const addOrEdit = (curriculumTheme, resetForm) => {
    console.log("Add/Edit", curriculumTheme)
    if (curriculumTheme.id === 0) {
      CurriculumThemesService.addCurriculumTheme(curriculumTheme);
      setLoadData(!loadData); // Request reload of data
    } else {
      CurriculumThemesService.updateCurriculumTheme(curriculumTheme);
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
    CurriculumThemesService.deleteCurruiculum(id)
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
        "Are you sure you want to delete this Curriculum Theme and all of its Detail?",
      subTitle: "You can't undo this action.",
      onConfirm: () => {
        onDelete(id);
      },
    })
  };
  const handleArchive = (item) => {
    CurriculumThemesService.patchCurriculumThemeSts(item.id, !archiveStatus)
    setLoadData(!loadData); // Request reload of data
    setNotify({
      isOpen: true,
      message: "Archive status changed",
      type: "success",
    });
  };

  return (
    <Fragment>
      <Grid container className={classes.root} spacing={1}>
        <Grid container className={classes.container} spacing={2}>
          {/* //* Header Bar */}
          <Grid item xs={11}>
            <Paper className={classes.paper}>
              <Toolbar>
                <Typography variant="h4">Currriculums</Typography>
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
                <Tooltip title="Add a Curriculum">
                  <Fab
                    className={classes.addButton}
                    color="primary"
                    aria-label="add a curriculum"
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

          {/* // TODO Add table here */}

        </Grid>
      </Grid>

      {/* //* POP-ups and Notifications */}
      <Controls.Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Curriculum Theme Form"
      >
        <CurriculumThemeForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Controls.Popup>
      <Controls.Notification notify={notify} setNotify={setNotify} />
      <Controls.ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </Fragment>
  );
}
