import React, { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// Material UI
import { Grid, IconButton, Paper, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
// Forms
import TemplateHeaderForm from "./TemplateHeader";
import TemplateDetailForm from "./templateDetailForm";
// Drag and Drop plus Scrollbars
import { DragDropContext } from "react-beautiful-dnd";
import TemplateColumn from "./TemplateColumn";
import Controls from '../../components/controls/Controls'
import { Scrollbars } from 'react-custom-scrollbars'
// Report Items
import NewWindow from 'react-new-window'
import { PDFViewer } from '@react-pdf/renderer';
import UserStoryTemplate from "./Reports/UserStoryTemplate";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { useFetchAllTemplateDetailsQuery, useAddTemplateDetailMutation } from "./templateDetailSlice";
import { changeColumnTaskList, changeTasks, changeTemplate, selectTemplateData } from "./templateDataSlice";
import { useDateValidation } from "@mui/lab/internal/pickers/hooks/useValidation";

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
  projectContainer: {
    justifyContent: "center",
    display: "flex",
  },
  columnHeader: {
    justifyContent: "flex-start",
    display: "flex",
    flexDirection: "row",
  },
  columnContainer: {
    paddingBottom: theme.spacing(2),
    justifyContent: "flex-start",
    display: "flex",
    flexDirection: "column",
  },
  userStoriesContainer: {
    paddingLeft: theme.spacing(10),
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
  },
  paper: {
    padding: theme.spacing(1.5),
    textAlign: "center",
    color: theme.palette.text.secondary,
    display: "flex",
    flexDirection: "column",
  },
  reportButton: {
    marginLeft: theme.spacing(3)
  }
}));

export default function Template() {
  const dispatch = useDispatch();
  const location = useLocation();
  const recordForEdit = location.state?.recordForEdit;
  const classes = useStyles();
  const recordForAdd = {
    id: 0
  }
  const { data = [], isLoading, error } = useFetchAllTemplateDetailsQuery(recordForEdit !== undefined ? recordForEdit : recordForAdd);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
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
  const [popup, setPopup] = useState(false);
  const [currentRecordId, setCurrentRecordId] = useState()
  const [headerId, setHeaderId] = useState(0)
  const [addTemplateDetail] = useAddTemplateDetailMutation();

  // * The variable below is an object used for Drag and Drop
  // This structure is required to exist prior to the initial render of the child components.
  // An RTK variable was required to persist the data and to leverage RTK's auto re-render 
  //   capability, otherwise the initial view of the component would always show initial values only.
  //   Any attempt to populate after data was read, would not trigger the re-render of the children.
  //   So RTK handle this requirement.
  const templateData = useSelector(selectTemplateData)


  // Helper function that will update state variable based upon database updates.
  const updateTemplateData = () => {
    let mapResult = {}
    let taskIds = []
    let taskIds2 = []

    data.map((item) => {
      let strId = item.id.toString()
      mapResult[strId] = { id: strId, content: item.title + " - (" + item.pointValue + "pts )" }
      if (item.bonusStatus)
        taskIds2.push(strId)
      else
        taskIds.push(strId)
    })

    dispatch(changeTasks(mapResult))
    let payload = {
      columnId: "column-1",
      taskIds: taskIds
    }
    dispatch(changeColumnTaskList(payload))
    let payload2 = {
      columnId: "column-2",
      taskIds: taskIds2
    }
    dispatch(changeColumnTaskList(payload2))
    // console.log("Template Data is: ", templateData.tasks)
  }

  // On initial entry of component, update RTK State variable
  useEffect(() => {
    if (recordForEdit == null) return
    setHeaderId(recordForEdit.id)
    updateTemplateData()
  }, [recordForEdit])

  // To sync with data cache, detect change in fetched query and update RTK State variable
  // ! isLoading is required because the combination of "data" and dispatch functions 
  // !   againgst the RTK global state will result in an infinite loop with useEffect.
  // ! All other combinations of component state variables, async calls, RTK and non-RTK were exhausted. 
  useEffect(() => {
    if (isLoading) return
    updateTemplateData()
  }, [isLoading, data])

  const addOrEdit = (templateDetail, resetForm) => {
    if (templateDetail.id === 0) {
      addTemplateDetail(templateDetail)

    } else {
      // updateTemplateDetail(tempDetail)
      setOpenPopup(false); // Close Popup modal
    }
    resetForm();
    // setRecordForEdit(null);
    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "success",
    });
    console.log("Relook at data: ", data)
  };

  const openInPopup = (item) => {
    // setRecordForEdit(item);
    setOpenPopup(true);
  };

  const toggleTaskForm = () => {
    setShowTaskForm(!showTaskForm)
    console.log("Toggle - Relook at data: ", data)
  }

  const handleDtlEdit = (record) => {
    openInPopup(record)
  };

  const handleReport = (id) => {
    setCurrentRecordId(id)
    setPopup(!popup)
  }

  // * Handle "Dragging"
  // Note: This is an "optimistic Update" so it is not waiting on the server.
  // A "PATCH" will be called via an endpoint at the end of this state managed update.
  const onDragEnd = (result) => {
    // Persist the changes made by the drag action
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    // Check to see if the user dropped the item back into its original position
    if (
      destination.droppableID === source.droppableID &&
      destination.index === source.index
    ) {
      return;
    }
    // reorder
    const startColumn = templateData.columns[source.droppableId];
    const finishColumn = templateData.columns[destination.droppableId];

    // console.log("===> Destination Index: ", destination.index);

    // * Moving within a list
    if (startColumn === finishColumn) {
      const newTasksIds = Array.from(startColumn.taskIds);
      newTasksIds.splice(source.index, 1); // remove one item at specific index
      newTasksIds.splice(destination.index, 0, draggableId); // insert at new location

      // create a "new" column with changed info (preserving immutability of original column)
      const newColumn = {
        ...startColumn,
        taskIds: newTasksIds,
      };

      const newState = {
        ...templateData,
        columns: {
          ...templateData.columns,
          [newColumn.id]: newColumn,
        },
      };
      console.log("*** NEW STATE: Int ***: ", newState);
      // setTemplateData(newState);
      dispatch(changeTemplate(newState))
      // TODO: Add call to DATA-PATCH here
      return;
    }

    // * Moving from list to another
    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1); // remove one item at specific index in startColumn
    const newStart = {
      ...startColumn,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finishColumn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finishColumn,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...templateData,
      columns: {
        ...templateData.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    // console.log("*** NEW STATE: U<->B *** : ", newState);
    dispatch(changeTemplate(newState))
    // setTemplateData(newState);
    // TODO: Add call to DATA-PATCH here
  };

  return (
    <Fragment>
      <Grid container className={classes.root} spacing={1}>
        {/* //* Header Bar */}
        <Grid container className={classes.headingContainer}>
          <Grid item xs={10}>
            <Paper className={classes.paper}>
              <Typography variant="h4">User Story Template</Typography>
              {recordForEdit != null &&
                < Controls.Button
                  className={classes.reportButton}
                  text="Report"
                  color="primary"
                  aria-label="report"
                  size="small"
                  onClick={() => handleReport(recordForEdit.id)}
                >
                </Controls.Button>}
            </Paper>
          </Grid>
        </Grid>

        {/* //* Template Header and Details */}
        <Grid container className={classes.projectContainer} spacing={2}>
          <Grid item xs={5}>
            <Paper className={classes.paper}>
              <Typography>Template Header</Typography>
              <TemplateHeaderForm recordForEdit={recordForEdit} />
            </Paper>
          </Grid>

          {/* //* User Stories */}
          {/* Setup container for Drag Context */}
          <DragDropContext onDragEnd={onDragEnd} className={classes.root}>
            <Grid item xs={5} container className={classes.columnHeader} >

              {/* //* Template Detail Add */}
              <Grid item xs={12} container className={classes.columnContainer}>
                <Paper className={classes.paper}>
                  <Grid container className={classes.userStoriesContainer}>
                    <Grid item xs={10}>
                      <Typography>User Stories</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      {recordForEdit != null &&
                        <IconButton
                          aria-label="show/hide template task add form"
                          onClick={toggleTaskForm}
                          size="small"
                        >
                          {!showTaskForm && <AddIcon />}
                          {showTaskForm && <RemoveIcon />}
                        </IconButton>
                      }
                    </Grid>
                  </Grid>


                  {(recordForEdit != null && showTaskForm) &&
                    <TemplateDetailForm recordForEdit={null} addOrEdit={addOrEdit} toggleTaskForm={toggleTaskForm} headerId={headerId} />
                  }
                </Paper>
              </Grid>

              <Grid item xs={12} container className={classes.columnContainer}>
                <Scrollbars
                  style={showTaskForm ? { height: '40vh' } : { height: '60vh' }}
                >

                  {/* Setup Droppable context columns */}
                  {/* //* Template Detail Column */}
                  {recordForEdit != null && templateData.columns.columnOrder.map((columnID) => {
                    const column = templateData.columns[columnID];
                    const tasks = column.taskIds.map(
                      (taskId) => templateData.tasks[taskId]
                    );
                    return (
                      <TemplateColumn
                        key={column.id}
                        column={column}
                        tasks={tasks}
                        headerId={headerId}
                        handleDtlEdit={handleDtlEdit}
                      />
                    );
                  })}
                </Scrollbars>
              </Grid>
            </Grid>
          </DragDropContext>
        </Grid>
      </Grid>

      {/* //* POP-ups and Notifications */}
      <Controls.Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Edit User Story"
      >
        <TemplateDetailForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Controls.Popup>
      <Controls.Notification notify={notify} setNotify={setNotify} />
      <Controls.ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      {popup && (
        <NewWindow
          name="PDF Viewer"
          title="PDF Viewer"
          onUnload={handleReport}
          center="screen"
        >
          <PDFViewer width="100%" height="1200" showtoolbar="true">
            <UserStoryTemplate id={currentRecordId} />
          </PDFViewer>,
        </NewWindow>

      )}

    </Fragment>
  );
}
