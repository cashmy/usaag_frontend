import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  InputAdornment,
  Fab,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  Tooltip,
  Typography,
  makeStyles,
} from "@material-ui/core";
// Icons
import AddIcon from "@material-ui/icons/Add";
import ArchiveIcon from "@material-ui/icons/Archive";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import AssignmentIcon from '@material-ui/icons/Assignment';
import SearchIcon from '@material-ui/icons/Search';
// Child components
import Controls from "../../components/controls/Controls";
import CurriculumThemeForm from "./CurriculumThemeForm";
// import CurriculumDetailTable from "./CurriculumDetailTable";
import useTable from "../../components/useTable";
// Service Layer
import CurriculumThemesService from "../../services/curriculumThemes.service";
// import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

// import { Scrollable, useScrollable } from 'nice-scrollbars';

// * Styling
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  multiLineDesc: {
    width: '25%',
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
  searchInput: {
    width: '25%',
    marginLeft: theme.spacing(5),
  },
}));

// * Table Columns
const columnCells = [
  { id: 'name', label: 'Curriculum Theme' },
  { id: 'numberOfWeeks', label: 'Weeks' },
  { id: 'technologyStack', label: 'Tech Stack' },
  { id: 'level', label: 'Level' },
  { id: 'dayTimeStatus', label: 'Day Time' },
  { id: 'actions', label: 'Actions', disableSorting: true },
]

// * Main Component
export default function CurriculumThemeTable() {
  // State Variables
  const classes = useStyles();
  const history = useHistory();
  // const scrollable = useScrollable();
  const [records, setRecords] = useState([]);
  const [loadData, setLoadData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
  const theadColor = "#d600f9"; // bright purple-pink
  const theadText = "#ffffff"; // white
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

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(records, columnCells, filterFn, theadColor, theadText);

  const handleSearch = e => {
    let target = e.target;
    // state can't store functions, so we are storing an object with the function internally defined.
    setFilterFn({
      fn: items => {
        // target.value is the search box contents
        if (target.value === "")
          return items;
        else
          return items.filter(
            (x) =>
              x.name
                .toLowerCase()
                .includes(target.value.toLowerCase()) ||
              x.technologyStack
                .toLowerCase()
                .includes(target.value.toLowerCase()) ||
              x.level
                .toLowerCase()
                .includes(target.value.toLowerCase())
          )
      }
    })
  }

  const addOrEdit = (curriculumTheme, resetForm) => {
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
  const handleDetails = (record) => {
    history.push({
      pathname: "/curriculumDetail",
      state: {
        recordForEdit: record,
      },
    });
  }

  

  return (
    <Fragment>
      <Grid container className={classes.root} spacing={1}>
        <Grid container className={classes.container} spacing={3}>
          {/* //* Header Bar */}
          <Grid item xs={11}>
            <Paper className={classes.paper}>
              <Toolbar>
                <Typography variant="h4">Currriculum Themes</Typography>

                <Controls.Input
                  label="Search Name, Tech Stack, Level"
                  fullWidth={false}
                  className={classes.searchInput}
                  InputProps={{
                    startAdornment: (<InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>)
                  }}
                  onChange={handleSearch}
                />

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

          {/* //* Main table here */}
          <Grid item xs={11}>
            <Paper className={classes.paper}>
              <TblContainer>
                <TblHead />
                <TableBody>
                  {isLoading ? (
                    <Typography> Loading ... </Typography>
                  ) : (
                    recordsAfterPagingAndSorting().map(item => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.numberOfWeeks}</TableCell>
                        <TableCell
                          className={classes.multiLineDesc}
                        >{item.technologyStack}</TableCell>
                        <TableCell>{item.level}</TableCell>
                        <TableCell>{item.dayTimeStatus === true ? "True" : "False"}</TableCell>
                        <TableCell>
                          <Controls.ActionButton
                            color="primary"
                            size="large"
                            onClick={() => handleEdit(item)}>
                            <EditOutlinedIcon fontSize="small" />
                          </Controls.ActionButton>
                          <Controls.ActionButton
                            color="secondary"
                            onClick={() => handleDelete(item.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </Controls.ActionButton>
                          <Controls.ActionButton
                            color="warning"
                            onClick={() => {
                              handleArchive(item);
                            }}
                          >
                            {!archiveStatus && <ArchiveIcon />}
                            {archiveStatus && <UnarchiveIcon />}
                          </Controls.ActionButton>
                          <Controls.ActionButton
                            color="info"
                            onClick={() => handleDetails(item)}
                          >
                            <AssignmentIcon fontSize="small" />
                          </Controls.ActionButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )
                  }
                </TableBody>
              </TblContainer>
              <TblPagination />
            </Paper>
          </Grid>
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
