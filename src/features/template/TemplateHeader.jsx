import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/useForm";
// Redux
import {
  useAddTemplateHeaderMutation,
  useUpdateTemplateHeaderMutation,
} from "./templateHeaderSlice";

// * Styling
const useStyles = makeStyles((theme) => ({
  container: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(3),
  },
  gridTextItem: {
    paddingLeft: theme.spacing(1),
  },
}));

// * Initial Fields Values
const initialFValues = {
  id: 0,
  name: "",
  abbreviation: "",
  technologyStack: "",
  goal: "",
  specialNotes: "",
  totalPoints: 0,
  totalWeightedPoints: 0,
  versionMain: 1,
  versionMinor: 0,
  versionSub: 0,
  notionScript: "",
  archived: false,
};

// *** MAIN FUNCTION: TemplateHeaderForm
export default function TemplateHeaderForm(props) {
  const classes = useStyles();
  const history = useHistory();
  const { recordForEdit } = props;
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues);

  // * Validation function (to be passed as a callback)
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required.";

    if ("abbreviation" in fieldValues)
      temp.abbreviation = fieldValues.abbreviation
        ? ""
        : "This field is required.";

    if ("technologyStack" in fieldValues)
      temp.technologyStack = fieldValues.technologyStack
        ? ""
        : "This field is required.";

    setErrors({
      ...temp,
    });

    // Check that every item in the array has a blank result (no errors) else return false.
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  // RTK Data reqests
  const [addTemplateHeader] = useAddTemplateHeaderMutation();
  const [updateTemplateHeader] = useUpdateTemplateHeaderMutation();

  // SaveSubmit Callback handler - event driven
  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate is successful then execute add or edit of data

    if (validate()) {
      if (values.id === 0) addTemplateHeader(values);
      else updateTemplateHeader(values);
    }
  };

  // If "Edit" mode then update form with current field values
  useEffect(
    () => {
      if (recordForEdit != null)
        setValues({
          ...recordForEdit,
        });
    },
    [recordForEdit],
    setValues
  );

  return (
    <Form>
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12}>
          <Controls.Input
            name="name"
            label="Name"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
          />
          <Grid container direction="row">
            <Grid container item xs={6} alignContent="flex-start">
              <Controls.Input
                name="abbreviation"
                label="Abbreviation"
                value={values.abbreviation}
                onChange={handleInputChange}
                error={errors.abbreviation}
              />
            </Grid>
            <Grid direction="row" container xs={6} alignItems="center">
              <Grid item xs={3}>
                <Typography className={classes.gridTextItem}>
                  Version:
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Controls.Input
                  name="versionMain"
                  label=""
                  value={values.versionMain}
                  onChange={handleInputChange}
                  error={errors.versionMain}
                  fullWidth={false}
                />
              </Grid>
              <Grid item xs={3}>
                <Controls.Input
                  name="versionMinor"
                  label=""
                  value={values.versionMinor}
                  onChange={handleInputChange}
                  error={errors.versionMinor}
                  fullWidth={false}
                />
              </Grid>
              <Grid item xs={3}>
                <Controls.Input
                  name="versionSub"
                  label=""
                  value={values.versionSub}
                  onChange={handleInputChange}
                  error={errors.versionSub}
                  fullWidth={false}
                />
              </Grid>
            </Grid>
          </Grid>
          <Controls.Input
            name="technologyStack"
            label="Technology Stack"
            value={values.technologyStack}
            onChange={handleInputChange}
            error={errors.technologyStack}
          />
          <Controls.Input
            name="goal"
            label="Goal"
            value={values.goal}
            onChange={handleInputChange}
            error={errors.goal}
            multiline
            rows={4}
          />
          <Controls.Input
            name="specialNotes"
            label="Special Notes/Instructions"
            value={values.specialNotes}
            onChange={handleInputChange}
            error={errors.specialNotes}
            multiline
            rows={4}
          />
          <Grid container direction="row" alignItems="center">
            <Grid container item xs={6} alignContent="flex-start">
              <Typography className={classes.gridTextItem}>
                Total Points: {values.totalPoints}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Controls.Input
                name="totalWeightedPoints"
                label="Wghtd Pts"
                value={values.totalWeightedPoints}
                onChange={handleInputChange}
                error={errors.totalWeightedPoints}
                fullWidth={true}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={11} styles={{ display: "flex" }}>
          <div styles={{ display: "flex" }}>
            <Controls.Button
              type="submit"
              text="Submit"
              onClick={handleSubmit}
            />
            <Controls.Button color="default" text="Reset" onClick={resetForm} />
            <Controls.Button
              color="default"
              text="Exit"
              onClick={() => history.goBack()}
            />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
