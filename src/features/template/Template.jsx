import React, { Fragment, useState } from "react";
// import clsx from 'clsx';
import {
  Grid,
  Paper,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import TemplateData from "../../tempData/template-data";
import { DragDropContext } from "react-beautiful-dnd";
import TemplateColumn from "./TemplateColumn";
import TemplateHeaderForm from "./TemplateHeader";

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
  container: {
    paddingBottom: theme.spacing(4),
    justifyContent: "center",
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
}));

export default function Template() {
  const classes = useStyles();
  const [templateData, setTemplateData] = useState(TemplateData);

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

    console.log("===> Destination Index: ", destination.index);

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
      console.log("*** NEW STATE ***: ", newState);
      setTemplateData(newState);
      // TODO: Add call to DATA-PATCH here
      return;
    }

    // Moving from list to another
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

    setTemplateData(newState);
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
            </Paper>
          </Grid>
        </Grid>

        {/* Template Header and Details */}
        <Grid container className={classes.projectContainer} spacing={2}>
          <Grid item xs={5}>
            <Paper className={classes.paper}>
              <Typography>Template Header</Typography>
              <TemplateHeaderForm />
            </Paper>
          </Grid>

          {/* Setup container for Drag Context */}
          <DragDropContext onDragEnd={onDragEnd} className={classes.root}>
            <Grid item xs={5} container className={classes.container}>
              {/* Setup Droppable context columns */}
              {/* Template Detail Column */}
              {templateData.columns.columnOrder.map((columnID) => {
                const column = templateData.columns[columnID];
                console.log("Column: ", column);
                const tasks = column.taskIds.map(
                  (taskId) => templateData.tasks[taskId]
                );
                console.log("Tasks: ", tasks);
                return (
                  <TemplateColumn
                    key={column.id}
                    column={column}
                    tasks={tasks}
                  />
                );
              })}
            </Grid>
          </DragDropContext>
        </Grid>
      </Grid>
    </Fragment>
  );
}
