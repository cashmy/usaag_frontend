import React, { Fragment } from 'react';
import {
    CardActions,
    IconButton,
    Tooltip
} from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

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
                        size="large">
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
                        size="large">
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
                        size="large">
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
                        size="large">
                        <AssignmentIndIcon />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Fragment>
    );
}