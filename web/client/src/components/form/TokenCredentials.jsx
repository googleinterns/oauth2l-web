import React, { useState } from "react";
import { Field } from "formik";
import {
  Typography,
  Box,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { TextField } from "formik-material-ui";
import "../../styles/form.css";

/**
 * @return {Box} containing form fields for adding scopes
 */
export default function TokenCredentials() {
  const [credFormat, setCredFormat] = useState("file");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);

  const handleCredFormat = (e) => {
    setCredFormat(e.currentTarget.value);
  };

  const handleFile = (e) => {
    const wrongFormat = e.currentTarget.files[0].type !== "application/json";

    if (wrongFormat) {
      setError(true);
    } else {
      setError(false);
      setFile(e.currentTarget.files[0]);
    }

    console.log(e.currentTarget.files[0]);
  };

  return (
    <Box className="form-box">
      <div className="form-text">
        <Typography variant="h5">Upload or enter credentials</Typography>
      </div>
      <RadioGroup
        row
        name="credentialFormat"
        value={credFormat}
        onChange={handleCredFormat}
      >
        <FormControlLabel
          value="file"
          control={<Radio />}
          label="File upload"
        />
        <FormControlLabel value="json" control={<Radio />} label="Text input" />
      </RadioGroup>
      {credFormat === "file" ? (
        <div>
          <label htmlFor="uploadCredential">
            <input
              className="file-input"
              id="uploadCredential"
              name="uploadCredential"
              type="file"
              onChange={handleFile}
            />
            <Button color="secondary" variant="contained" component="span">
              Upload credential
            </Button>
          </label>
          <div className="form-alert">
            {!error && (
              <Alert variant="outlined" severity="error">
                Invalid file format, please use a .json file!
              </Alert>
            )}
          </div>
        </div>
      ) : credFormat === "json" ? (
        <Field
          multiline
          rows={15}
          fullWidth
          variant="outlined"
          color="secondary"
          label="Paste credential in JSON format"
          name="tokenCredentials"
          component={TextField}
        />
      ) : null}
    </Box>
  );
}
