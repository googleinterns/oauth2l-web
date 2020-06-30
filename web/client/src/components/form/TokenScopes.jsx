import React from "react";
import { Field } from "formik";
import { Typography, Box } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import "../../styles/form.css";

export default function TokenScopes() {
  return (
    <div>
      <Box className="form-box">
        <div className="form-text">
          <Typography variant="h5">Enter scopes</Typography>
        </div>
        <Field
          multiline
          fullWidth
          variant="outlined"
          label="Scopes"
          name="tokenScopes"
          component={TextField}
        />
      </Box>
    </div>
  );
}
