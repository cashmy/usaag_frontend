import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Controls from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';

// * Styling
const useStyles = makeStyles((theme) => ({
    container: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(3),
    }
}));


// * Main component
export default function TemplateDetailForm(props) {
    const classes = useStyles();
    const { addOrEdit, recordForEdit, toggleTaskForm, headerId } = props
    const initialFValues = {
        headerId: headerId,
        id: 0,
        title: '',
        description: '',
        pointValue: 5,
        bonusStatus: false,
        greyHighlight: false,
    }

    // Validation function (to be passed as a callback)
    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ('title' in fieldValues)
            temp.title = fieldValues.title
                ? ""
                : "Required."
        if ("description" in fieldValues)
            temp.description = fieldValues.description
                ? ""
                : "This field is required.";

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
        if (validate())
            addOrEdit(values, resetForm);
    };

    const handleReset = () => {
        if (recordForEdit == null)
            resetForm()
        else setValues({ ...recordForEdit })
    }

    useEffect(() => {
        // console.log("TD UseEffect: ", headerId)
        if (recordForEdit != null)
            setValues({
                ...recordForEdit,
                headerId: headerId
            })
    }, [recordForEdit])

    return (
        <Form>
            <Grid container spacing={2} className={classes.container}>
                <Grid item xs={4}>
                    <Controls.Input
                        name="title"
                        label="Short Title"
                        value={values.title}
                        onChange={handleInputChange}
                        error={errors.title}
                    />
                </Grid>
                <Grid item xs={2} style={{ marginRight: 24 }}>
                    <Controls.Input
                        name="pointValue"
                        label="Points"
                        value={values.pointValue}
                        onChange={handleInputChange}
                        error={errors.pointValue}
                    />
                </Grid>
                <Grid item xs={2} >
                    <Controls.Switch
                        name="greyHighlight"
                        label="Grey"
                        value={values.greyHighlight}
                        onChange={handleToggleChange}
                    />
                </Grid>
                <Grid item xs={3} >
                    <Controls.Switch
                        name="bonusStatus"
                        label="Bonus"
                        value={values.bonusStatus}
                        onChange={handleToggleChange}
                    />
                </Grid>
                <Grid item xs={11} style={{ marginTop: -16 }} >
                    <Controls.Input
                        name="description"
                        label="Description/Feature"
                        value={values.description}
                        onChange={handleInputChange}
                        error={errors.description}
                        multiline
                        rows={recordForEdit == null ? 4 : 8}
                    />
                </Grid>
            </Grid>
            <Grid item xs={11}>
                <div styles={{ display: "flex" }}>
                    <Controls.Button
                        type="submit"
                        text={values.id !== 0 ? "Submit" : "Add"}
                        onClick={handleSubmit}
                    />
                    {values.id !== 0 && <Controls.Button
                        color="secondary"
                        text="Reset"
                        onClick={handleReset}
                    />}
                    <Controls.Button
                        color="info"
                        text="Cancel"
                        onClick={toggleTaskForm}
                    />
                </div>
            </Grid>
        </Form >
    )
}