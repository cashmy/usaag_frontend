import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Grid } from '@material-ui/core';
import Controls from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';
// Service Layer
import CurriculumTypesService from '../../services/curriculumTypes.service';

const initialFValues = {
    id: 0,                  // Record Id
    themeId: 0,             // Curriculum Theme Id
    lectureTopics: '',      // Topic of this item
    currTypeId: "2",        // Curr Type Id (defaults to 2 = Lecture)
    assignmentSequence: 0,  // Used to seq/re-seq order of execution
    dayToAssign: 0,         // Start day of this item
    headerId: "",         // User Story Template Header Id (opt)
    projectDays: 1,         // Length of days for this item
    notes: "",              // Additional Notes
    archived: false,        // archived status (default to false)
}

// * Main component
export default function CurriculumThemeForm(props) {

    const { addOrEdit, recordForEdit } = props;
    const [nextSequence, setNextSequence] = useState(initialFValues.assignmentSequence + 10);
    const [currTypes, setCurrTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    // State variables for 'useForm'
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleToggleChange,
        resetForm,
    } = useForm(initialFValues);

    // Validation function (to be passed as a callback)
    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ('lectureTopics' in fieldValues)
            temp.lectureTopics = fieldValues.lectureTopics
                ? ""
                : "This field is required."
        if ("currTypeId" in fieldValues)
            temp.currTypeId = fieldValues.currTypeId
                ? 0
                : "This field is required.";

        setErrors({
            ...temp
        })

        // Check that every item in the array has a blank result (no errors) else return false.
        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

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
    };
    
    const handleClose = () => {
    };

    // Default form field values to incoming data record
    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    // Rtv Curriculum Types on initial load for Select/DropDown list
    useEffect(() => {
        getCurrTypes();
    }, []);
    const getCurrTypes = async (e) => {
        try {
            setIsLoading(true);
            const response = await CurriculumTypesService
                .getCurriculumTypesBySts(false)
                .then();
            setCurrTypes(response.data)
            setIsLoading(false)
        } catch (e) {
            console.log("API call 'Get Curr Types' unsuccessful", e);
        }
    }

    return (
        <Form>
            {console.log("Curr Dtl Props: ", props)}
            <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12}>
                    {/* TODO: Place Curriculum Theme Header here */}
                    <Controls.Input
                        name="lectureTopics"
                        label="Topic"
                        value={values.lectureTopics}
                        onChange={handleInputChange}
                        error={errors.lectureTopics}
                    />
                    <Grid container direction="row">
                        <Grid item xs={6} alignContent="flex-start">
                            <Controls.Select
                                name="currTypeId"
                                label="Curr Type"
                                value={values.currTypeId}
                                onChange={handleInputChange}
                                error={errors.currTypeId}
                                options={currTypes.map(currType => (
                                    { id: `${currType.id}`, title: `${currType.name}` }
                                ))
                                }
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Controls.Input
                                name="dayToAssign"
                                label="Day to Assign"
                                value={values.dayToAssign}
                                onChange={handleInputChange}
                                error={errors.dayToAssign}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Controls.Input
                                name="projectDays"
                                label="Project Days"
                                value={values.projectDays}
                                onChange={handleInputChange}
                                error={errors.projectDays}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Controls.Select
                        name="headerId"
                        label="Project"
                        value={values.headerId}
                        onChange={handleInputChange}
                        error={errors.headerId}
                        options={currTypes.map(currType => (
                            { id: `"${currType.id}"`, title: `"${currType.name}"` }
                        ))
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controls.Input
                        name="notes"
                        label="Days in Week"
                        value={values.notes}
                        onChange={handleInputChange}
                        error={errors.notes}
                        multiline
                        rows={4}
                    />
                </Grid>
            </Grid>
            <Grid item xs={11}>
                <div styles={{ display: "flex" }}>
                    <Controls.Button
                        type="submit"
                        text="Submit"
                        onClick={handleSubmit}
                    />
                    <Controls.Button
                        color="default"
                        text="Reset"
                        onClick={handleReset}
                    />
                    <Controls.Button
                        color="default"
                        text="Exit"
                        onClick={handleClose}
                    />
                </div>
            </Grid>
        </Form >
    )
}