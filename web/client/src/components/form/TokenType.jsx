import React from "react";
import { RadioGroup } from "formik-material-ui";
import { Field } from "formik";
import { FormControlLabel, Radio, Typography, Box } from "@material-ui/core";
import "../../styles/form.css";

export default function TokenType() {
  return (
    <div>
      <Box className="form-box">
        <div className="form-text">
          <Typography variant="h5">Choose token type </Typography>
        </div>
        <Field name="tokenType" row component={RadioGroup}>
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
      </Box>
      <Box className="form-box">
        <div className="form-text">
          <Typography variant="h5">Choose token format</Typography>
        </div>
        <Field name="tokenFormat" row component={RadioGroup}>
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
            value="JSON Compact"
            control={<Radio color="primary" />}
            label="JSON Compact"
            id="format.jsonCompact"
          />
          <FormControlLabel
            value="Pretty"
            control={<Radio color="primary" />}
            label="Pretty"
            id="format.pretty"
          />
        </Field>
      </Box>
    </div>
  );
}
