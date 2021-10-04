import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';
// Service Layer
import CohortService from "../../services/cohorts.service";

const initialFValues = {
    id: 0,
    name : '',
    abbreviation: '',
    slackChannel : '',
    cpkColor: '#bdbdbd',
    textColor: 'white',
    archived: false,
}


export default function CohortForm(props) {
    
    const {addOrEdit, recordForEdit} = props

    // Validation function (to be passed as a callback)
    // TODO: Consider/research using a Switch/Case statement instead
    const validate = (fieldValues = values) => {
        let temp = {...errors};
        if('name' in fieldValues) 
            temp.name = fieldValues.clinicName ? "" : "This field is required." 
        if('abbreviation' in fieldValues)
                temp.abbreviation = fieldValues.abbreviation.length ? "" : "This field is required."
        if('slackChannel' in fieldValues)
                temp.slackChannel = fieldValues.slackChannel.length ? "" : "This field is required."
        if('textColor' in textColor)
            temp.textColor = fieldValues.textColor ? "" : "This field is required."
        setErrors({
            ...temp
        })
    
        // Check that every item in the array has a blank result (no errors) else return false.
        if(fieldValues === values)
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
        if(validate())
            addOrEdit(values, resetForm);
    };


    useEffect(() => {
        if(recordForEdit != null) 
        setValues({
            ...recordForEdit
        }) 
    },[recordForEdit])

    return(
        <Form>
            <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={6}>
                    <Controls.Input
                        name="name" 
                        label="Name"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    <Controls.Input
                        name="abbreviation" 
                        label="Abbrev."
                        value={values.abbreviation}
                        onChange={handleInputChange}
                        error={errors.abbreviation}
                    />
                    <Controls.Input 
                        name="slackChannel"
                        label="Slack Channel"
                        value={values.slackChannel}
                        onChange={handleInputChange}
                        error={errors.slackChannel}
                    />
                    <Controls.Input
                        name="cpkColor"
                        label="Background color"
                        value={values.cpkColor}
                        onChange={handleInputChange}
                        error={errors.cpkColor}
                   />
                   <Controls.Input
                        name="textColor"
                        label="Text color"
                        value={values.textColor}
                        onChange={handleInputChange}
                        error={errors.textColor}
                   />               
                </Grid>
                <Grid item xs={6}>
                    <div styles={{display: "flex"}}>
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
        </Form>
    )
}