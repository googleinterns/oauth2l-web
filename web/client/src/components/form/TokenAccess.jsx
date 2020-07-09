import React from "react";
import { Field, useFormikContext } from "formik";
import { Autocomplete } from "@material-ui/lab";
import { Typography, Box, Chip } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import PropTypes from "prop-types";
import scopes from "../../util/scopes_data";
import "../../styles/form.css";

/**
 * @param {Object} props contains field label to set form label
 * @return {Box} containing form fields for adding scopes
 */
export default function TokenAccess(props) {
  const { label } = props;
  const { setFieldValue } = useFormikContext();

  return (
    <Box className="form-box">
      <div className="form-text">
        <Typography variant="h5">Enter {label.toLowerCase()}</Typography>
      </div>
      <Autocomplete
        multiple
        name={`token${label}`}
        id="tags-filled"
        options={scopes.map((option) => option.scope)}
        freeSolo
        onChange={(e, value) => {
          setFieldValue(`token${label}`, value);
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option}
              key={getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <Field
            {...params}
            multiline
            name={`token${label}`}
            fullWidth
            variant="outlined"
            label={label}
            component={TextField}
          />
        )}
      />
    </Box>
  );
}

TokenAccess.propTypes = {
  label: PropTypes.string,
};
