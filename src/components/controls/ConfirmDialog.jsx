import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import Controls from './Controls'

const useStyles = makeStyles(theme => ({
    dialog: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(6),
    },
    dialogTitle: {
        textAlign: 'center',
    },
    dialogContent: {
        textAlign: 'center',
    },
    dialogAction: {
        justifyContent: 'center'
    },
    titleIcon: {
        color: theme.palette.secondary.main,
        '& hover': {

            color: theme.palette.secondary,
            cursor: 'default',
        },
        '& .MuiSvgIcon-root': {
            fontSize: '8rem',
        }
    }
}))

export default function ConfirmDialog(props) {

    const { confirmDialog, setConfirmDialog } = props;
    const classes = useStyles();

    return (
        <Dialog open={confirmDialog.isOpen} classes={{paper: classes.dialog}}>
            <DialogTitle className={classes.dialogTitle}>
                <IconButton disableRipple className={classes.titleIcon} size="large">
                    <NotListedLocationIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Controls.Button 
                    text="No"
                    color="default"
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen:false})}
                />
                <Controls.Button 
                    text="Yes"
                    color="secondary"
                    onClick={confirmDialog.onConfirm}
                />
            </DialogActions>
        </Dialog>
    );
}