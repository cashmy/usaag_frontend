import React, { Fragment } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Grid, Paper, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import TemplateTask from "./TemplateTask";
import clsx from "clsx";

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
    padding: theme.spacing(1),
    textAlign: "center",
  },
  taskList: {
    padding: theme.spacing(1),
  },
  //   taskListStandard: {
  //     backgroundColor: theme.palette.background.paper,
  //     // color: theme.palette.getContrastText(theme.palette.text.secondary),
  //   },
  //   taskListDragging: {
  //     backgroundColor: "#bdbdbd",
  //     // color: theme.palette.getContrastText(theme.palette.background.paper),
  //   },
}));

export default function Column(props) {
  const classes = useStyles();

  return (
    <Fragment>
      <Paper className={classes.paper}>
        <Grid container className={classes.container}>
          <Grid item xs={12}>
            <Typography className={classes.title} variant="h5">
              {props.column.title}
            </Typography>
          </Grid>
          {/* Define Draggable Items - map into place */}
          {/* Template Detail Items */}
          <Droppable droppableId={props.column.id}>
            {(provided, snapshot) => (
              <Grid
                item
                xs={10}
                className={clsx(classes.tasklist, {
                  //   [classes.taskListStandard]: !snapshot.isDraggingOver,
                  //   [classes.taskListDragging]: snapshot.isDraggingOver,
                })}
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
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
