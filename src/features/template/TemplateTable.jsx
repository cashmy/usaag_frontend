import React, { useState } from "react";
import { useHistory, Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  InputAdornment,
  Grid,
  Paper,
  Fab,
  FormControlLabel,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";

import makeStyles from '@mui/styles/makeStyles';

// Icons
import AddIcon from "@mui/icons-material/Add";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import PrintIcon from '@mui/icons-material/Print';
// import DataUsageIcon from '@mui/icons-material/DataUsage'; // * For "where used"

// Wrapped Components
import Controls from "../../components/controls/Controls";

// Redux
import {
  useDeleteTemplateHeaderMutation,
  useFetchAllTemplateHeadersQuery,
  useChangeTemplateStatusMutation,
} from "./templateHeaderSlice";

// Report Items
import NewWindow from 'react-new-window'
import { PDFViewer } from '@react-pdf/renderer';
import UserStoryTemplate from "./Reports/UserStoryTemplate";

// * Styling
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  headingContainer: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    justifyContent: "center",
    display: "flex",
  },
  titleContainer: {
    padding: theme.spacing(1.4),
  },
  cardContainer: {
    marginLeft: theme.spacing(17),
    marginRight: theme.spacing(17),
    justifyContent: "flex-start",
    display: "flex",
  },
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
  addButton: {
    position: "absolute",
    right: "10px",
  },
  archiveSwitch: {
    position: "absolute",
    right: "10%",
  },
  paper: {
    padding: theme.spacing(1.5),
    textAlign: "center",
    color: theme.palette.text.secondary,
    display: "flex",
    flexDirection: "column",
  },
  titlePaper: {
    padding: theme.spacing(1.5),
    textAlign: "center",
    backgroundColor: "#00a152",
    color: theme.palette.getContrastText("#00a152"),
    display: "flex",
    flexDirection: "column",
  },
  cardDetails: {
    // width: "250px",
  },
}));


export default function TemplateTable() {
  const classes = useStyles();
  const history = useHistory();
  const bull = <span className={classes.bullet}>•</span>;
  const [loadData, setLoadData] = useState(false);
  const [archiveStatus, setArchiveStatus] = useState(false);
  const [popup, setPopup] = useState(false);
  const [currentRecordId, setCurrentRecordId] = useState()
  // Initialize with a default filter of all records, bypasses initial load error
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  // RTK Data reqests
  const { data = [], isLoading } = useFetchAllTemplateHeadersQuery({
    status: archiveStatus,
    reload: loadData,
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [deleteTemplateHeader] = useDeleteTemplateHeaderMutation();
  const [archiveTemplateHeader] = useChangeTemplateStatusMutation();

  // Modal Window state variables
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  // * Handle helper functions
  const handleSearch = (e) => {
    let target = e.target;
    // state can't store functions, so we are storing an object with the function internally defined.
    setFilterFn({
      fn: (items) => {
        // target.value is the search box contents
        if (target.value === "") return items;
        else
          return items.filter(
            (x) =>
              x.name.toLowerCase().includes(target.value.toLowerCase()) ||
              x.abbreviation
                .toLowerCase()
                .includes(target.value.toLowerCase()) ||
              x.technologyStack
                .toLowerCase()
                .includes(target.value.toLowerCase())
          );
      },
    });
  };

  const handleEdit = (record) => {
    // console.log("Record param: ", record);
    history.push({
      pathname: "/template",
      state: {
        recordForEdit: record,
      },
    });
  };

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    deleteTemplateHeader(id);
    setLoadData(!loadData);
    setNotify({
      isOpen: true,
      message: "Record deleted",
      type: "error",
    });
  };
  // Toggles between Active and Archived status display
  const handleToggle = () => {
    setArchiveStatus(!archiveStatus);
  };
  // Changes the archive status of a given record
  const handleArchive = (id, status) => {
    let body =
    {
      id: id,
      archived: !status
    }
    archiveTemplateHeader(body);
    // alert(`Changing archive status for ${id}!`);
    setNotify({
      isOpen: true,
      message: status ? "Record activated" : "Record archived",
      type: "info",
    });
  };
  // Helper function to format the version int a short readable format
  const formatVersion = (main, minor, sub) => {
    return main.toString() + "." + minor.toString() + "." + sub.toString();
  };
  const handlePrint = (id) => {
    setCurrentRecordId(id)
    setPopup(!popup)
  }


  // * Main component render
  return (
    <React.Fragment>
      <Grid container className={classes.root} spacing={1}>
        {/* //* Header Bar */}
        <Grid container className={classes.headingContainer} spacing={2}>
          <Grid item xl={4} >
            <Paper className={classes.titlePaper}>
              <Grid item md={12} className={classes.titleContainer}>
                <Typography variant="h4">User Story Templates</Typography>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Toolbar>
                <Controls.Input
                  style={{ width: 350 }}
                  size="small"
                  label="Search Name, Abbr, and Tech Stack"
                  fullWidth={false}
                  className={classes.searchInput}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleSearch}
                />
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
                  component={RouterLink}
                  to={"template"}
                  // to={{ pathname: "template", state: { recordForEdit: recordForEdit}, }}
                  className={classes.addButton}
                  color="primary"
                  aria-label="add a template"
                  size="small"
                // onClick={handleAdd}
                >
                  <AddIcon />
                </Fab>
              </Toolbar>
            </Paper>
          </Grid>
        </Grid>

        {/* //* Card Grid */}
        <Grid container className={classes.cardContainer} spacing={2}>
          {/* // TODO: Map function goes here  */}
          {/* {recordsAfterPagingAndSorting().map((item) => (
          ))} */}
          {isLoading ? (
            <Typography> Loading ... </Typography>
          ) : (
            data.map((item, index) => (
              <Grid item xl={2} key={index} >
                <Card className={classes.cardDetails}>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textPrimary"
                      gutterBottom
                    >
                      {item.name}
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {bull} {item.abbreviation} {bull}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="p"
                      color="textSecondary"
                    >
                      Tech Stack: -- {item.technologyStack}
                      <br />
                      Tot/Weighted Pts: -- {item.totalPoints}/
                      {item.totalWeightedPoints}
                    </Typography>
                    <Typography
                      variant="caption"
                      component="p"
                      align="right"
                      color={archiveStatus ? "error" : "textPrimary"}
                    >
                      <br />
                      Version:{" "}
                      {formatVersion(
                        item.versionMain,
                        item.versionMinor,
                        item.versionSub
                      )}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      aria-label="edit template"
                      onClick={() => {
                        handleEdit(item);
                      }}
                      style={{ color: "darkcyan" }}
                    >
                      <EditOutlinedIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete template"
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title:
                            "Are you sure you want to delete this Template and all of its Detail?",
                          subTitle: "You can't undo this action.",
                          onConfirm: () => {
                            onDelete(item.id);
                          },
                        });
                      }}
                      style={{ color: "red" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      aria-label="archive template"
                      onClick={() => {
                        handleArchive(item.id, item.archived);
                      }}
                      style={{ color: "darkorchid" }}
                    >
                      {!archiveStatus && <ArchiveIcon />}
                      {archiveStatus && <UnarchiveIcon />}
                    </IconButton>
                    <IconButton
                      aria-label="print template"
                      onClick={() => {
                        handlePrint(item.id);
                      }}
                      color="primary"
                    >
                      <PrintIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Grid>

      {/* //* Dialogs, Modals, and Popups */}
      <Controls.Notification notify={notify} setNotify={setNotify} />
      <Controls.ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      {/* PDF Viewer */}
      {popup && (
        <NewWindow
          name="PDF Viewer"
          title="PDF Viewer"
          onUnload={handlePrint}
          center="screen"
        >
          <PDFViewer width="100%" height="1200" showtoolbar="true">
            <UserStoryTemplate id={currentRecordId} />
          </PDFViewer>,
        </NewWindow>
      )}
    </React.Fragment>
  );
}
