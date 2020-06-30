import React from "react";
import { Field } from "formik";
import { Typography, Box } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import "../../styles/form.css";

export default function TokenScopes() {
  return (
    <div>
      <Box className="form-box">
        <Typography variant="h5">Enter scopes</Typography>
        <Field fullWidth name="scopes" component={TextField} />
      </Box>
    </div>
  );
}
