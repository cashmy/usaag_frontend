import React from "react";
import { TextField } from "@mui/material";

const Input = (props) => {
  const { name, label, value, error = null, onChange, ...other } = props;

  return (
    <TextField
      variant="filled"
      size="small"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      fullWidth
      {...(error && { error: true, helperText: error })}
      {...other}
    />
  );
};

export default Input;
