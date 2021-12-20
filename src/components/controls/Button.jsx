import React from 'react'
import { Button as MuiButton } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(0.5)
    },
    label: {
        textTransform: "none"
    }
}))

const Button = (props) => {
    const { text, size, color, variant, onClick, ...other} = props
    const classes = useStyles();

    return (
        <MuiButton 
            variant={variant || "contained"}
            size={size || "small"}
            color={color}
            onClick={onClick}
            {...other}
            classes={{ root:classes.root, label:classes.label }}
        >
            {text}
        </MuiButton>
    )
}

export default Button