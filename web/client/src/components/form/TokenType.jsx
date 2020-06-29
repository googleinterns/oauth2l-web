import React from "react";
import { RadioGroup } from "formik-material-ui";
import { Field } from "formik";
import { FormControlLabel, Radio, Typography } from "@material-ui/core";

export default function TokenType() {
  return (
    <div>
      <Typography variant="h5">Choose token type </Typography>
      <Field name="tokenType" component={RadioGroup}>
        <FormControlLabel
          value="OAuth"
          control={<Radio color="primary" />}
          label="OAuth"
          id="type.oauth"
        />
        <FormControlLabel
          value="JWT"
          control={<Radio color="primary" />}
          label="JWT"
          id="type.jwt"
        />
      </Field>
      <Typography variant="h5">Choose token format</Typography>
      <Field name="tokenFormat" component={RadioGroup}>
        <FormControlLabel
          value="Bare"
          control={<Radio color="primary" />}
          label="Bare"
          id="format.bare"
        />
        <FormControlLabel
          value="Header"
          control={<Radio color="primary" />}
          label="Header"
          id="format.header"
        />
        <FormControlLabel
          value="JSON"
          control={<Radio color="primary" />}
          label="JSON"
          id="format.json"
        />
        <FormControlLabel
          value="JSON_Compact"
          control={<Radio color="primary" />}
          label="JSON_Compact"
          id="format.json_compact"
        />
        <FormControlLabel
          value="Pretty"
          control={<Radio color="primary" />}
          label="Pretty"
          id="format.pretty"
        />
      </Field>
    </div>
  );
}
