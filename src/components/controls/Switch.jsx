import React from 'react'
import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    Tooltip,
    Switch as MuiSwitch
} from '@mui/material'


const Switch = (props) => {
    const { name, label, value, error = null, onChange, } = props

    return (
        <Tooltip title={`Toggle ${label} status`}>
            <FormControl variant='outlined' fullWidth
                {...(error && { error: true })}
            >
                <FormControlLabel
                    control={
                        <MuiSwitch
                            aria-label={`Toggle ${label} status`}
                            checked={value}
                            onChange={onChange}
                            name={name}
                        />
                    }
                    label={label}
                />
                {error && <FormHelperText>{error}</FormHelperText>}
            </FormControl>
        </Tooltip>
    )
}



export default Switch