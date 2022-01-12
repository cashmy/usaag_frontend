import React, { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ClrPicker from '../../components/controls/ColorPicker';
import Controls from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';

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
    textColor: 'black',
    archived: false,
}

// * Main component
export default function CohortForm(props) {

    const classes = useStyles();
    const { addOrEdit, recordForEdit } = props

    // * Validation function (to be passed as a callback)
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
            addOrEdit(values, resetForm, true);
        else
            addOrEdit(values, resetForm, false)
    };
    const handleReset = () => {
        if (recordForEdit == null)
            resetForm()
        else setValues({ ...recordForEdit })
    };
    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    // * Main Render
    return (
        <Form style={{ minHeight: '350px' }}>
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
                    {/* <Typography className={classes.picker} variant="caption" >Background Color</Typography> */}
                    <ClrPicker
                        name="cpkColor"
                        label="Background Color"
                        value={values.cpkColor}
                        onChange={handleInputChange}
                    />
                    <ClrPicker
                        name="textColor"
                        label="Text Color"
                        value={values.textColor}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <div styles={{ display: "flex" }}>
                        <Controls.Button
                            type="submit"
                            text="Submit"
                            onClick={handleSubmit}
                        />
                        <Controls.Button
                            color="secondary"
                            text="Reset"
                            onClick={handleReset}
                        />
                    </div>
                </Grid>
            </Grid>
        </Form >
    )
}