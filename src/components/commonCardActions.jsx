import React, { Fragment } from 'react';
import {
    CardActions,
    IconButton,
    Tooltip
} from "@material-ui/core";
import ArchiveIcon from "@material-ui/icons/Archive";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

export default function CommonCardActions(props) {

    const { archiveStatus, item, handleArchive, handleEdit, handleDelete, handleAssign, recordName, color } = props;

    return (
        <Fragment>
            <CardActions>
                <Tooltip title="Edit">
                    <IconButton
                        style={{ color: `${color}` }}
                        aria-label={`edit ${recordName}`}
                        onClick={() => {
                            handleEdit(props.item);
                        }}
                    >
                        <EditOutlinedIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton
                        style={{ color: `${color}` }}
                        aria-label={`delete ${recordName}`}
                        onClick={() => {
                            handleDelete(item.id);
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Chg Archive Sts">
                    <IconButton
                        style={{ color: `${color}` }}
                        aria-label={`archive ${recordName}`}
                        onClick={() => {
                            handleArchive(item);
                        }}
                    >
                        {!archiveStatus && <ArchiveIcon />}
                        {archiveStatus && <UnarchiveIcon />}
                    </IconButton>
                </Tooltip>
                <Tooltip title="Assign items">
                    <IconButton
                        style={{ color: `${color}` }}
                        aria-label={`assign items to ${recordName}`}
                        onClick={() => {
                            handleAssign(item);
                        }}
                    >
                        <AssignmentIndIcon />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Fragment>
    )
}