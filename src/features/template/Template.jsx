import React, { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import clsx from 'clsx';
import { Grid, Paper, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
// import TemplateData from "../../tempData/template-data";
import { DragDropContext } from "react-beautiful-dnd";
import TemplateColumn from "./TemplateColumn";
import TemplateHeaderForm from "./TemplateHeader";
import Controls from '../../components/controls/Controls'
import { Scrollbars } from 'react-custom-scrollbars'
// Report Items
import NewWindow from 'react-new-window'
import { PDFViewer } from '@react-pdf/renderer';
import UserStoryTemplate from "./Reports/UserStoryTemplate";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { useFetchAllTemplateDetailsQuery } from "./templateDetailSlice";
import { changeColumnTaskList, changeTasks, changeTemplate, selectTemplateData } from "./templateDataSlice";

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
  columnContainer: {
    paddingBottom: theme.spacing(4),
    justifyContent: "flex-start",
    display: "flex",
    flexDirection: "column",
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
  const { data = [], isLoading, error } = useFetchAllTemplateDetailsQuery(recordForEdit.id);
  const [popup, setPopup] = useState(false);
  const [currentRecordId, setCurrentRecordId] = useState()
  const templateData = useSelector(selectTemplateData)

  useEffect(() => {
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

  }, [recordForEdit.id])

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
      // console.log("*** NEW STATE: Int ***: ", newState);
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
        {/* Header Bar */}
        <Grid container className={classes.headingContainer}>
          <Grid item xs={10}>
            <Paper className={classes.paper}>
              <Typography variant="h4">User Story Template</Typography>
              <Controls.Button
                className={classes.reportButton}
                text="Report"
                color="primary"
                aria-label="report"
                size="small"
                onClick={() => handleReport(recordForEdit.id)}
              >
              </Controls.Button>
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

          {/* Setup container for Drag Context */}
          <DragDropContext onDragEnd={onDragEnd} className={classes.root}>
            <Grid item xs={5} container className={classes.columnContainer} >
              <Scrollbars
                style={{ height: '75vh' }}
              >
                {/* Setup Droppable context columns */}
                {/* //* Template Detail Column */}
                {/* {console.log("Processing Template Data: ", templateData.columns["column-1"].taskIds)} */}
                {templateData.columns.columnOrder.map((columnID) => {
                  const column = templateData.columns[columnID];
                  const tasks = column.taskIds.map(
                    (taskId) => templateData.tasks[taskId]
                  );
                  // console.log("Proccessed Tasks are: ", tasks)
                  return (
                    <TemplateColumn
                      key={column.id}
                      column={column}
                      tasks={tasks}
                    />
                  );
                })}
              </Scrollbars>
            </Grid>
          </DragDropContext>
        </Grid>
      </Grid>

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
