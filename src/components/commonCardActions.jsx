import React, { Fragment } from 'react';
import {
    CardActions,
    IconButton,
} from "@material-ui/core";
import ArchiveIcon from "@material-ui/icons/Archive";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";

export default function CommonCardActions(props) {

    const { archiveStatus, item, handleArchive, handleEdit, handleDelete, recordName } = props;

    return (
        <Fragment>
            <CardActions>
                <IconButton
                    aria-label={`edit ${recordName}`}
                    onClick={() => {
                        handleEdit(props.item);
                    }}
                >
                    <EditOutlinedIcon />
                </IconButton>
                <IconButton
                    aria-label={`delete ${recordName}`}
                    onClick={() => {
                        handleDelete(item.id);
                    }}
                >
                    <DeleteIcon />
                </IconButton>
                <IconButton
                    aria-label={`archive ${recordName}`}
                    onClick={() => {
                        handleArchive(item.id);
                    }}
                >
                    {!archiveStatus && <ArchiveIcon />}
                    {archiveStatus && <UnarchiveIcon />}
                </IconButton>
            </CardActions>
        </Fragment>
    )
}