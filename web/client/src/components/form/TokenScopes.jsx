import React from "react";
import { Field } from "formik";
import { Typography } from "@material-ui/core";
import { TextField } from "formik-material-ui";

export default function TokenScopes() {
  return (
    <div>
      <Typography variant="h5">Enter scopes</Typography>
      <Field name="scopes" component={TextField} label="Scopes" />
    </div>
  );
}
