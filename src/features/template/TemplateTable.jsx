import React, { useState, useEffect } from "react";
import { useHistory, Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
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
  //   TableBody,
  //   TableRow,
  //   TableCell,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";

// Icons
import AddIcon from "@material-ui/icons/Add";
import ArchiveIcon from "@material-ui/icons/Archive";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { red } from "@material-ui/core/colors";

// Wrapped Components
import Controls from "../../components/controls/Controls";

// Redux
import {
  //   useAddTemplateHeaderMutation,
  useDeleteTemplateHeaderMutation,
  useFetchAllTemplateHeadersQuery,
  //   useUpdateTemplateHeaderMutation,
} from "./templateHeaderSlice";

// Primary CRUD Child Component
import Template from "./Template";
import { FormatAlignRight, VerticalAlignCenter } from "@material-ui/icons";

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
  iconSecondaryColor: {
    backgroundColor: "#00e676",
    color: theme.palette.getContrastText("#00e676"),
  },
  cardDetails: {
    // width: "250px",
  },
  archivedColor: {
    backgroundColor: theme.palette.error,
  },
}));

// ?? DO I EVEN NEED THIS ??
const columnCells = [
  { id: "abbreviation", label: "Abbrev" },
  { id: "name", label: "Name" },
  { id: "technologyStack", label: "Technology Stack" },
  { id: "totalPoints", label: "Tot Pts", disableSorting: true },
  { id: "totalWeightedPoints", label: "Wtd Pts", disableSorting: true },
  { id: "versionMain", label: "Version" },
  { id: "versionMinor", label: "Minor" },
  { id: "versionSub", label: "Sub" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function TemplateTable() {
  const classes = useStyles();
  const history = useHistory();
  const bull = <span className={classes.bullet}>•</span>;
  const [loadData, setLoadData] = useState(false);
  const [archiveStatus, setArchiveStatus] = useState(false);
  // Initialize with a default filter of all records, bypasses initial load error
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  // RTK Data reqests
  const { data = [], refetch } = useFetchAllTemplateHeadersQuery({
    status: archiveStatus,
    reload: loadData,
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [deleteTemplateHeader] = useDeleteTemplateHeaderMutation();

  // Modal Window state variables
  const [openPopup, setOpenPopup] = useState(false);
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
    console.log("Record param: ", record);
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
  const handleArchive = (id) => {
    // priorAuth.PAArchived = !archiveStatus;
    // PriorAuthService.updatePA(priorAuth);
    alert(`Changing archive status for ${id}!`);
  };

  // Helper function to format the version int a short readable format
  const formatVersion = (main, minor, sub) => {
    return main.toString() + "." + minor.toString() + "." + sub.toString();
  };

  useEffect(() => {
    // trigger rerender if data changes
    console.log("Inside useEffect", loadData);
  }, [data]);

  return (
    <React.Fragment>
      <Grid container className={classes.root} spacing={1}>
        {/* Header Bar */}
        <Grid container className={classes.headingContainer} spacing={2}>
          <Grid item xl={4} direction="row" alignItems="center">
            <Paper className={classes.paper}>
              {/* <Grid item xs={1}>
                <AssignmentIcon
                  fontSize="large"
                  className={classes.iconSecondaryColor}
                />
              </Grid> */}
              <Grid item md={11} className={classes.titleContainer}>
                <Typography variant="h4">User Story Templates</Typography>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Toolbar>
                <Controls.Input
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
                  // onClick={() => {
                  //   setRecordForEdit(null);
                  // }}
                >
                  <AddIcon />
                </Fab>
              </Toolbar>

              {/* <Typography variant="h6">Search Bar goes here</Typography> */}
            </Paper>
          </Grid>
        </Grid>

        {/* Card Grid */}
        <Grid container className={classes.cardContainer} spacing={2}>
          {/* // TODO Map function goes here  */}
          {/* {recordsAfterPagingAndSorting().map((item) => (
          ))} */}
          {console.log("Data: ", data)}
          {data.map((item, index) => (
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
                    // className={clsx({ [classes.archivedColor]: archiveStatus })}
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
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    aria-label="archive template"
                    onClick={() => {
                      handleArchive(item.id);
                    }}
                  >
                    {!archiveStatus && <ArchiveIcon />}
                    {archiveStatus && <UnarchiveIcon />}
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Controls.Notification notify={notify} setNotify={setNotify} />
      <Controls.ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </React.Fragment>
  );
}
