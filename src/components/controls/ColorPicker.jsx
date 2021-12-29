import React, { Fragment, useState, useRef, useCallback } from 'react';
import {
    IconButton,
    InputAdornment,
    TextField,
} from "@mui/material";
import {
    KeyboardArrowDown,
    KeyboardArrowUp
} from "@mui/icons-material"
import makeStyles from '@mui/styles/makeStyles';
import useClickOutside from "../useClickOutside";
import TextContrast from '../getTextContrast';
import { HexColorPicker } from 'react-colorful';
import "./styles.css";

const useStyles = makeStyles((theme) => ({
    // popover: {
    //     position: 'absolute',
    //     top: 'calc(100% + 2px)',
    //     left: '0px',
    //     borderRadius: '9px',
    //     boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)"
    // },
    // swatch: {
    //     width: '28px',
    //     height: '28px',
    //     borderRadius: '8px',
    //     border: '3px solid #fff',
    //     boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(0, 0, 0, 0.1)',
    //     cursor: 'pointer'
    // },
}))

const ClrPicker = (props) => {
    const classes = useStyles();
    const { name, label, value, error = null, onChange, ...other } = props;
    const popover = useRef();
    const [isOpen, toggle] = useState(false);
    // const [value, setValue] = useState(props.value)

    const handleClose = useCallback(() => toggle(false), []);
    useClickOutside(popover, handleClose);

    const handleChangeProp = (color, event) => {
        console.log("HandleChangeProp:", color)
        let tempProp = {
            name: name,
            value: color
        }
        event = { ...event, target: tempProp }
        props.onChange(event)
        // setValue(color)
    }

    return (
        <Fragment>
            <TextField
                variant="filled"
                size="small"
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                {...(error && { error: true, helperText: error })}
                {...other}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => toggle(true)}
                                style={{ backgroundColor: value, color: TextContrast.getTextContrast(value) }}
                            >
                                {isOpen ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
            <div className="picker">
                {isOpen && (
                    <div className="popover" ref={popover}>
                        <HexColorPicker color={value} onChange={handleChangeProp} />
                    </div>
                )}
            </div>
        </Fragment>
    )
}

export default ClrPicker;