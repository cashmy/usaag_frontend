import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/useForm";

// * Initial Fields Values
const initialFValues = {
  id: 0,
  name: "",
  abbreviation: "",
  technologyStack: "",
  goal: "",
  specialNotes: "",
  totalPoints: "",
  totalWeightedPoints: "",
  versionMain: 1,
  versionMinor: 0,
  versionSub: 0,
  notionScript: "",
};

// *** MAIN FUNCTION: TemplateHeaderForm
export default function TemplateHeaderForm(props) {
  const { addOrEdit, recordForEdit } = props;
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

  // SaveSubmit Callback handler - event driven
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) addOrEdit(values, resetForm);
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
      <Grid container alignItems="flex-start" spacing={2}>
        <Grid item xs={11}>
          <Controls.Input
            name="name"
            label="Name"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
          />
          <Controls.Input
            name="abbreviation"
            label="Abbreviation"
            value={values.abbreviation}
            onChange={handleInputChange}
            error={errors.abbreviation}
            fullWidth={false}
          />
          <Controls.Input
            name="technologyStack"
            label="Technology Stack"
            value={values.technologyStack}
            onChange={handleInputChange}
            error={errors.technologyStack}
          />
        </Grid>
        <Grid styles={{ display: "flex" }}>
          <div styles={{ display: "flex" }}>
            <Controls.Button
              type="submit"
              text="Submit"
              onClick={handleSubmit}
            />
            <Controls.Button color="default" text="Reset" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
