import React from 'react';
import { Snackbar } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Alert } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    root: {
        top: theme.spacing(9)
    }
}))

export default function Notification(props) {

    const { notify, setNotify } = props;
    const classes = useStyles()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setNotify({
            ...notify,
            isOpen: false
        })
    }

    return (

        <Snackbar
            className={classes.root}
            open={notify.isOpen}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={handleClose}
        >
            <Alert
                severity={notify.type || "info"}
                onClose={handleClose}
            >
                {notify.message}
            </Alert>
        </Snackbar>
    )
}