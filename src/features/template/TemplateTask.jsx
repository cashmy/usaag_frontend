import React, { Fragment } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Grid, makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  container: {
    border: "1px solid lightgrey",
    borderRadius: theme.spacing(0.25),
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    // backgroundColor: theme.palette.text.primary,
    // color: theme.palette.getContrastText(theme.palette.text.primary),
  },
  taskColorStandard: {
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.getContrastText(theme.palette.text.primary),
  },
  taskColorDragging: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.getContrastText(theme.palette.background.paper),
  },
  paper: {
    color: theme.palette.text.secondary,
  },
}));

export default function TemplateTask(props) {
  const classes = useStyles();
  return (
    <Fragment>
      <Draggable draggableId={props.task.id} index={props.index}>
        {(provided, snapshot) => (
          <Grid
            item
            xs={12}
            className={clsx(classes.container, {
              [classes.taskColorStandard]: !snapshot.isDragging,
              [classes.taskColorDragging]: snapshot.isDragging,
            })}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {props.task.content}
          </Grid>
        )}
      </Draggable>
    </Fragment>
  );
}
