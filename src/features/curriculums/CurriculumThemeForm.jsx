import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';


const initialFValues = {
    id: 0,
    name: '',
    level: 'Beginner',
    technologyStack: '',
    numberOfWeeks: 3,
    daysInWeek: 5,
    dayTimeStatus: true,
    archived: false,
}

// * Main component
export default function CurriculumThemeForm(props) {

    const { addOrEdit, recordForEdit } = props

    // Validation function (to be passed as a callback)
    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ('name' in fieldValues)
            temp.name = fieldValues.name
                ? ""
                : "This field is required."
        if ("technologyStack" in fieldValues)
            temp.technologyStack = fieldValues.technologyStack
                ? ""
                : "This field is required.";
        if ('level' in fieldValues)
            temp.level = fieldValues.level
                ? ""
                : "This field is required."
        if ('numberOfWeeks' in fieldValues)
            temp.numberOfWeeks = fieldValues.numberOfWeeks
                ? ""
                : "This field is required."
        if ('daysInWeek' in fieldValues)
            temp.daysInWeek = fieldValues.daysInWeek
                ? ""
                : "This field is required."
        if ('daysInWeek' in fieldValues && temp.daysInWeek === "0")
            temp.daysInWeek = fieldValues.daysInWeek < 8
                ? ""
                : "There are only 7 days in a week."
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
        handleToggleChange,
        resetForm,
    } = useForm(initialFValues);

    // SaveSubmit Callback handler - event driven
    const handleSubmit = (event) => {
        event.preventDefault();
        let result = validate()
        console.log("Result of validation: ", result)
        if (result)
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
                    <Controls.Input
                        name="technologyStack"
                        label="Tech Stack"
                        value={values.technologyStack}
                        onChange={handleInputChange}
                        error={errors.technologyStack}
                    />
                    <Controls.Select
                        name="level"
                        label="Level"
                        value={values.level}
                        onChange={handleInputChange}
                        error={errors.level}
                        options={[
                            { id: "Beginner", title: "Beginner" },
                            { id: "Intermediate", title: "Intermediate" },
                            { id: "Advanced", title: "Advanced" },
                        ]}
                    />
                </Grid>
            <Grid item xs={4}>
                <Controls.Input
                    name="numberOfWeeks"
                    label="Nmbr of Wks"
                    value={values.numberOfWeeks}
                    onChange={handleInputChange}
                    error={errors.numberOfWeeks}
                />
                <Controls.Input
                    name="daysInWeek"
                    label="Days in Week"
                    value={values.daysInWeek}
                    onChange={handleInputChange}
                    error={errors.daysInWeek}
                />
                <Controls.Switch
                    name="dayTimeStatus"
                    label="Day Time Status"
                    value={values.dayTimeStatus}
                    onChange={handleToggleChange}
                />
            </Grid>
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
        </Form >
    )
}