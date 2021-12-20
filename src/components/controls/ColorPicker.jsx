import React, { Fragment, useState } from 'react';
import {
    IconButton,
    InputAdornment,
    TextField,
} from "@mui/material";
import {
    Visibility,
    VisibilityOff
} from "@mui/icons-material"
import makeStyles from '@mui/styles/makeStyles';
import { ChromePicker } from 'react-color'

const useStyles = makeStyles((theme) => ({
    popover: {
        position: 'absolute',
        zIndex: '2',
    },
    cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    },
}))

const ClrPicker = (props) => {
    const classes = useStyles();
    const { name, label, value, error = null, onChange, ...other } = props;
    const [displayColorPicker, setDisplayColorPicker] = useState(false)
    const [colorInput, setColorInput] = useState(value)

    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker)
    }

    const handleClose = () => {
        setDisplayColorPicker(false)
    }

    const handleChangeComplete = (color, event) => {
        setColorInput(event.hex)
        console.log("Change complete: ", event.hex)
        onChange()
        // TODO: Update value with newly selected color.
    }

    const popover = {
        position: 'absolute',
        zIndex: '2',
    }
    const cover = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    }

    return (
        <Fragment>
            <TextField
                variant="filled"
                size="small"
                label={label}
                name={name}
                value={colorInput}
                onChange={onChange}
                fullWidth
                {...(error && { error: true, helperText: error })}
                {...other}

                // endAdornment={
                //     <InputAdornment position="end">
                //         <IconButton
                //             aria-label="toggle password visibility"
                //         // onClick={handleClickShowPassword}
                //         // onMouseDown={handleMouseDownPassword}
                //         >
                //             <Visibility />
                //         </IconButton>
                //     </InputAdornment>
                // }
            />
            {/* <button onClick={handleClick}>Pick Color</button> */}
            {/* {displayColorPicker ? <div style={popover}> */}
            {/* <div style={cover} onClick={handleClose} />
            <ChromePicker
                color={colorInput}
                onChangeComplete={handleChangeComplete}
            /> */}
            {/* </div> : null} */}
        </Fragment>
    )
}

export default ClrPicker;