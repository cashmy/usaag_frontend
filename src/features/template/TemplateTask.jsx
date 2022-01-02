import React, { Fragment, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Grid, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import makeStyles from '@mui/styles/makeStyles';
import clsx from "clsx";
import Controls from "../../components/controls/Controls";
// RTK
import { useDeleteTemplateDetailMutation } from "./templateDetailSlice";

// * Styling
const useStyles = makeStyles((theme) => ({
  container: {
    border: "1px solid lightgrey",
    borderRadius: theme.spacing(0.25),
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    // flexDirection: "column",
    // backgroundColor: theme.palette.text.primary,
    // color: theme.palette.getContrastText(theme.palette.text.primary),
  },
  taskColorStandard: {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.text.primary
        : theme.palette.info.main,
    color: theme.palette.getContrastText(theme.palette.info.main),
  },
  taskColorDragging: {
    backgroundColor: "#757575",
    color: theme.palette.getContrastText("#757575"),
  },
  paper: {
    color: theme.palette.text.secondary,
  },
  moreIcon: {
    justifySelf: "flex-end"
  }
}));

export default function TemplateTask(props) {
  const { task, handleEdit, headerId } = props
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [deleteTemplateDetail] = useDeleteTemplateDetailMutation();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "success",
  });

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleItemEdit = () => {
    handleEdit();
    handleMenuClose();
  }

  // const handleDuplicateItem = () => {
  //   handleEdit();
  //   handleMenuClose();
  // }

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });

    let params = {
      headerId: headerId,
      id: task.id
    }
    deleteTemplateDetail(params)

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
        "Are you sure you want to delete this Cohort and all of its Detail?",
      subTitle: "You can't undo this action.",
      onConfirm: () => {
        onDelete(id);
      },
    })
    handleMenuClose();
  };


  return (
    <Fragment>
      <Draggable draggableId={props.task.id} index={props.index}>
        {(provided, snapshot) => (
          <Grid
            container
            // xs={12}
            className={clsx(classes.container, {
              [classes.taskColorStandard]: !snapshot.isDragging,
              [classes.taskColorDragging]: snapshot.isDragging,
            })}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isdragging={toString(snapshot.isDragging)}
            sx={{ color: "text.secondary" }}
          >
            <Grid item xs={10}>
              {props.task.content}
            </Grid>
            <Grid item xs={2} className={classes.moreIcons}>
              <IconButton
                className={clsx({
                  [classes.taskColorStandard]: !snapshot.isDragging,
                  [classes.taskColorDragging]: snapshot.isDragging,
                })}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                // onClick={() => props.handleEdit(props.task)}
                onClick={handleMenuClick}
                size="small"
              >
                <MoreVertIcon />
              </IconButton>
            </Grid>
          </Grid>
        )}
      </Draggable>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleItemEdit}>
          <ListItemIcon>
            <EditOutlinedIcon />
          </ListItemIcon>
          <ListItemText>
            Edit
          </ListItemText>
        </MenuItem>
        {/* <MenuItem onClick={handleDuplicateItem}>
          <ListItemIcon>
            <ContentCopyIcon />
          </ListItemIcon>
          <ListItemText>
            Duplicate
          </ListItemText>
        </MenuItem> */}
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText>
            Delete
          </ListItemText>
        </MenuItem>
      </Menu>
      <Controls.Notification notify={notify} setNotify={setNotify} />
      <Controls.ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </Fragment>
  );
}
