import React from "react";
import { RadioGroup } from "formik-material-ui";
import { Field } from "formik";
import { FormControlLabel, Radio, Typography, Box } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import PropTypes from "prop-types";
import "../../styles/form.css";

/**
 * @param {Object} props contains validation errors and touched values representing if a field has been changed
 * @return {div} containing form fields for adding token type and format
 */
export default function TokenType(props) {
  const { errors, touched } = props;

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
        <div className="form-alert">
          {errors.tokenType && touched.tokenType && (
            <Alert variant="outlined" severity="error">
              {errors.tokenType}
            </Alert>
          )}
        </div>
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
        <div className="form-alert">
          {errors.tokenFormat && touched.tokenFormat && (
            <Alert variant="outlined" severity="error">
              {errors.tokenFormat}
            </Alert>
          )}
        </div>
      </Box>
    </div>
  );
}

TokenType.propTypes = {
  errors: PropTypes.object,
  touched: PropTypes.object,
};
