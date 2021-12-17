import React, { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Controls from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';
// import { ColorPicker } from 'material-ui-color';
// import { Palette } from '@mui/icons-material';

// * Styling
const useStyles = makeStyles((theme) => ({
    picker: {
        marginLeft: theme.spacing(1),
    },
    container: {
        alignItems: "flex-start",
        display: "in-line",
    },
}))

const initialFValues = {
    id: 0,
    name: '',
    abbreviation: '',
    slackChannel: '',
    cpkColor: '#bdbdbd',
    textColor: 'white',
    archived: false,
}

// * Main component
export default function CohortForm(props) {

    const classes = useStyles();
    const { addOrEdit, recordForEdit } = props

    const stdPalette = {
        red: 'red',
        blue: 'blue',
        green: 'green',
        yellow: 'yellow',
        cyan: 'cyan',
        lime: 'lime',
        gray: 'gray',
        orange: 'orange',
        purple: 'purple',
        black: 'black',
        white: 'white',
        pink: 'pink',
        darkblue: 'darkblue',
    };

    const textPalette = {
        white: 'white',
        grey: 'grey',
        near_black: '#302f2f',
        black: 'black',

    };

    // Validation function (to be passed as a callback)
    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('abbreviation' in fieldValues)
            temp.abbreviation = fieldValues.abbreviation.length ? "" : "This field is required."
        if ('abbreviation' in fieldValues && temp.abbreviation === "")
            temp.abbreviation = fieldValues.abbreviation.length < 4 ? "" : "Max of 3 letters - use abbrievation."
        if ('slackChannel' in fieldValues)
            temp.slackChannel = fieldValues.slackChannel.length ? "" : "This field is required."
        if ('textColor' in fieldValues)
            temp.textColor = fieldValues.textColor ? "" : "This field is required."
        setErrors({
            ...temp
        })

        // Check that every item in the array has a blank result (no errors) else return false.
        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
    } = useForm(initialFValues);

    // SaveSubmit Callback handler - event driven
    const handleSubmit = (event) => {
        console.log("Cohort Submitted")
        event.preventDefault();
        if (validate())
            addOrEdit(values, resetForm);
    };

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form>
            <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={8}>
                    <Controls.Input
                        name="name"
                        label="Name"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    <Grid container className={classes.container} spacing={2}>
                        <Grid item xs={4}>
                            <Controls.Input
                                name="abbreviation"
                                label="Abbrev."
                                value={values.abbreviation}
                                onChange={handleInputChange}
                                error={errors.abbreviation}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <Controls.Input
                                name="slackChannel"
                                label="Slack Channel"
                                value={values.slackChannel}
                                onChange={handleInputChange}
                                error={errors.slackChannel}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Typography className={classes.picker} variant="caption" >Background Color</Typography>
                    {/* <ColorPicker 
                        name="cpkColor"
                        defaultValue={values.cpkColor} 
                        value={values.cpkColor}
                        onChange={handleInputChange} 
                        palette={stdPalette} />
                    <Typography className={classes.picker} variant="caption" >Text Color</Typography>
                    <ColorPicker 
                        name="textColor" 
                        value={values.textColor} 
                        onChange={handleInputChange} 
                        palette={textPalette} 
                    /> */}
                </Grid>
                <Grid item xs={6}>
                    <div styles={{ display: "flex" }}>
                        <Controls.Button
                            type="submit"
                            text="Submit"
                            onClick={handleSubmit}
                        />
                        <Controls.Button
                            color="default"
                            text="Reset"
                            onClick={resetForm}
                        />
                    </div>
                </Grid>
            </Grid>
        </Form >
    )
}