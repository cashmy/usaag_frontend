import React, { Fragment, useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Grid, Paper, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import TemplateTask from "./TemplateTask";
import clsx from "clsx";

// * Styling
const useStyles = makeStyles((theme) => ({
  container: {
    border: "1px solid lightgrey",
    borderRadius: "2px",
    // width: theme.spacing(40),
    // height: theme.spacing(20), // 320px
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    // margin: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(2),
  },
  title: {
    padding: theme.spacing(.5),
    textAlign: "center",
  },
  taskList: {
    padding: theme.spacing(1),
  },
}));

export default function Column(props) {
  const classes = useStyles();

  useEffect(() => {
    // console.log("Column: ", props.column.title)
    // console.log(">> Column Tasks: ", props.tasks)
  }, [props])

  return (
    <Fragment>
      <Paper className={classes.paper}>
        <Grid container className={classes.container}>
          <Grid item xs={12}>
            <Typography className={classes.title} variant="h6">
              {props.column.title}
            </Typography>
          </Grid>
          {/* Define Draggable Items - map into place */}
          {/* Template Detail Items */}
          <Droppable droppableId={props.column.id}>
            {(provided, snapshot) => (
              <Grid container
                item
                xs={10}
                className={clsx(classes.tasklist, {
                  //   [classes.taskListStandard]: !snapshot.isDraggingOver,
                  //   [classes.taskListDragging]: snapshot.isDraggingOver,
                })}
                ref={provided.innerRef}
                {...provided.droppableProps}
                isdraggingover={toString(snapshot.isDraggingOver)}
              >
                {props.tasks.map((task, index) => (
                  <TemplateTask key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </Grid>
      </Paper>
    </Fragment>
  );
}
