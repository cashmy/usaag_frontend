import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars'
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  InputAdornment,
  Fab,
  FormControlLabel,
  Grid,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DataUsageIcon from '@mui/icons-material/DataUsage'; // * For "where used"
import CopyAllIcon from '@mui/icons-material/CopyAll';

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
    marginTop: theme.spacing(3),
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
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const bull = <span className={classes.bullet}>•</span>;
  const open = Boolean(anchorEl);
  const [loadData, setLoadData] = useState(false);
  const [archiveStatus, setArchiveStatus] = useState(false);
  const [popup, setPopup] = useState(false);
  const [currentRecordId, setCurrentRecordId] = useState();
  const [currentItem, setCurrentItem] = useState();
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
    navigate({
      pathname: "/template",
      state: {
        recordForEdit: record,
      },
    });
  };
  // Process delete request and close modal
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
  // Open modal and request confirmation
  const handleDelete = (item) => {
    setConfirmDialog({
      isOpen: true,
      title:
        "Are you sure you want to delete this Template and all of its Detail?",
      subTitle: "You can't undo this action.",
      onConfirm: () => {
        onDelete(item);
      },
    });
    handleMenuClose();
  }
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
    handleMenuClose();
  };
  // Helper function to format the version int a short readable format
  const formatVersion = (main, minor, sub) => {
    return main.toString() + "." + minor.toString() + "." + sub.toString();
  };
  const handlePrint = (id) => {
    setCurrentRecordId(id)
    setPopup(!popup)
  }
  const handleMenuClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setCurrentItem(item);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentItem(null);
  };
  const handleTemplateUse = (record, action) => {
    // Viable actions are:
    //    "display"
    //    "copy"
    //    "copyarch"
    navigate({
      pathname: "/currDtlByTmp",
      state: {
        templateInfo: record,
        action: action,
      },
    });
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
          <Scrollbars style={{ height: "80vh" }}>
            <Grid container spacing={2}>
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
                        {/* Edit */}
                        <IconButton
                          aria-label="edit template"
                          onClick={() => {
                            handleEdit(item);
                          }}
                          style={{ color: "darkcyan" }}
                        >
                          <EditOutlinedIcon />
                        </IconButton>
                        {/* <IconButton
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
                    </IconButton> */}
                        {/* Print */}
                        <IconButton
                          aria-label="print template"
                          onClick={() => {
                            handlePrint(item.id);
                          }}
                          color="primary"
                        >
                          <PrintIcon />
                        </IconButton>
                        {/* MoreVertical */}
                        <IconButton
                          aria-controls={open ? 'basic-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClick={(e) => handleMenuClick(e, item)}
                          size="small"
                        >
                          <MoreVertIcon />
                        </IconButton>

                      </CardActions>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Scrollbars>
        </Grid>

      </Grid>

      {/* //* Dialogs, Modals, and Popups */}
      <Controls.Notification notify={notify} setNotify={setNotify} />
      <Controls.ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      {/* PDF Viewer */}
      {
        popup && (
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
        )
      }
      {/* Vertical Menu  */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {/* Archive Item */}
        <MenuItem
          onClick={() => handleArchive(currentItem.id, currentItem.archived)}
        >
          <ListItemIcon
            aria-label="archive template"
            style={{ color: "darkorchid" }}>
            {!archiveStatus && <ArchiveIcon />}
            {archiveStatus && <UnarchiveIcon />}
          </ListItemIcon>
          {!archiveStatus && <ListItemText>Archive</ListItemText>}
          {archiveStatus && <ListItemText>Re-activate</ListItemText>}
        </MenuItem>
        {/* Delete Item */}
        <MenuItem onClick={() => handleDelete(currentItem.id)}>
          <ListItemIcon
            aria-label="delete template"
            style={{ color: "red" }}
          >
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText>
            Delete
          </ListItemText>
        </MenuItem>
        {/* Copy */}
        <MenuItem onClick={() => handleTemplateUse(currentItem, "copy")}>
          <ListItemIcon
            aria-label="copy template"
            style={{ color: "#2196f3" }}
          >
            <ContentCopyIcon />
          </ListItemIcon>
          <ListItemText>
            Copy
          </ListItemText>
        </MenuItem>
        {/* Copy and Archive */}
        <MenuItem onClick={() => handleTemplateUse(currentItem, "copyarch")}>
          <ListItemIcon
            aria-label="copy and archive old"
            style={{ color: "purple" }}
          >
            <CopyAllIcon />
          </ListItemIcon>
          {!archiveStatus && <ListItemText>Copy & Archive</ListItemText>}
          {archiveStatus && <ListItemText>Copy & Activate</ListItemText>}
        </MenuItem>
        {/* Usage */}
        <MenuItem onClick={() => handleTemplateUse(currentItem, "display")}>
          <ListItemIcon
            aria-label="template usage"
            style={{ color: "#00a152" }}
          >
            <DataUsageIcon />
          </ListItemIcon>
          <ListItemText>
            Where used
          </ListItemText>
        </MenuItem>
      </Menu>
    </React.Fragment >
  );
}
