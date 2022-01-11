import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Controls from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';
// Service Layer
import CurriculumTypesService from '../../services/curriculumTypes.service';
// Redux (RTK)
import { useFetchAllTemplateHeadersQuery } from "../template/templateHeaderSlice";

// ***** Styles *****
const useStyles = makeStyles((theme) => ({
    themeTitle: {
        padding: theme.spacing(1.5),
        textAlign: "center",
        backgroundColor: "purple",
        color: "white",
        display: "flex",
        flexDirection: "column",
    },
}));

// * Initial Form Values
const initialFValues = {
    id: 0,                  // Record Id
    themeId: 0,             // Curriculum Theme Id
    lectureTopics: '',      // Topic of this item
    currTypeId: "2",        // Curr Type Id (defaults to 2 = Lecture)
    assignmentSequence: 10,  // Used to seq/re-seq order of execution
    dayToAssign: 0,         // Start day of this item
    headerId: "",         // User Story Template Header Id (opt)
    projectDays: 1,         // Length of days for this item
    notes: "",              // Additional Notes
}

// * Main component
export default function CurriculumDetailForm(props) {
    const classes = useStyles();
    const { addOrEdit, recordForEdit, themeInfo } = props;
    const [nextSequence, setNextSequence] = useState(initialFValues.assignmentSequence + 10);
    const [currTypes, setCurrTypes] = useState([]);
    // RTK Data reqests
    const { data = [] } = useFetchAllTemplateHeadersQuery({
        status: false,
        refetchOnMountOrArgChange: true,
        skip: false,
    });

    // * State variables for 'useForm'
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleToggleChange,
        resetForm,
    } = useForm(initialFValues);

    // * Validation function (to be passed as a callback)
    const validate = (fieldValues = values) => {
        // Default ThemeId to incoming props for Add mode.
        console.log("props theme info: ", props.themeInfo)
        if (fieldValues.themeId === 0)
            fieldValues.themeId = props.themeInfo.currThemeId

        let temp = { ...errors };
        if ('lectureTopics' in fieldValues)
            temp.lectureTopics = fieldValues.lectureTopics
                ? ""
                : "This field is required."
        if ("currTypeId" in fieldValues)
            temp.currTypeId = fieldValues.currTypeId
                ? ""
                : "This field is required.";

        setErrors({
            ...temp
        })

        // Check that every item in the array has a blank result (no errors) else return false.
        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }
    // ***** Event Handlers *****
    const handleSubmit = (close, event) => {
        // event.preventDefault();
        console.log("submit:", values)
        if (validate())
            if (close)
                addOrEdit(values, resetForm, true);
            else
                addOrEdit(values, resetForm, false)
    };
    const handleReset = () => {
        if (recordForEdit == null)
            resetForm()
        else setValues({ ...recordForEdit })
    };
    // const handleClose = () => {
    // };
    // Default form field values to incoming data record
    useEffect(() => {
        if (recordForEdit !== null && recordForEdit !== undefined)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    // Rtv Curriculum Types on initial load for Select/DropDown list
    // TODO: Consider switching this to RTK and cache the results
    useEffect(() => {
        const getCurrTypes = async (e) => {
            try {
                const response = await CurriculumTypesService
                    .getCurriculumTypesBySts(false)
                    .then();
                setCurrTypes(response.data)
            } catch (e) {
                console.log("API call 'Get Curr Types' unsuccessful", e);
            }
        }
        getCurrTypes();
    }, []);

    return (
        <Form>
            <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12}>
                    <Typography className={classes.themeTitle} variant="h5">{themeInfo.currThemeName}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Controls.Input
                        name="lectureTopics"
                        label="Topic"
                        value={values.lectureTopics}
                        onChange={handleInputChange}
                        error={errors.lectureTopics}
                    />
                    <Grid container direction="row" spacing={2}>
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
                        options={data.map(item => (
                            { id: `${item.id}`, title: `${item.name}` }
                        ))
                        }
                    />
                </Grid>
                <Grid item xs={9}>
                    <Controls.Input
                        name="notes"
                        label="Notes"
                        value={values.notes}
                        onChange={handleInputChange}
                        error={errors.notes}
                        multiline
                        rows={4}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Controls.Input
                        name="assignmentSequence"
                        label="Assignment Sequence"
                        value={values.assignmentSequence}
                        onChange={handleInputChange}
                        error={errors.assignmentSequence}
                    />
                </Grid>
            </Grid>
            <Grid item xs={11}>
                <div styles={{ display: "flex" }}>
                    <Controls.Button
                        type="submit"
                        text="Submit"
                        onClick={() => handleSubmit(true)}
                    />
                    <Controls.Button
                        type="submit"
                        text="Save/Cont"
                        onClick={() => handleSubmit(false)}
                    />
                    <Controls.Button
                        color="secondary"
                        text="Reset"
                        onClick={handleReset}
                    />
                    {/* <Controls.Button
                        color="primary"
                        text="Exit"
                        onClick={handleClose}
                    /> */}
                </div>
                {recordForEdit != null && <Typography>ThemeId: {recordForEdit.themeId} - Id: {recordForEdit.id}</Typography>}
            </Grid>
        </Form >
    )
}