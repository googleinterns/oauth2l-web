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
  const [fileContent, setFileContent] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleCredFormat = (e) => {
    setCredFormat(e.currentTarget.value);
  };

  const handleFile = (e) => {
    const wrongFormat = e.currentTarget.files[0].type !== "application/json";

    if (wrongFormat) {
      setErrorMsg("Invalid file format, please use a .json file!");
      setError(true);
    } else {
      setError(false);
      readFile(e.currentTarget.files[0]);
    }

    console.log(e.currentTarget.files[0]);
  };

  const readFile = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      validateJSON(reader.result);
    };
    reader.readAsText(file);
  };

  const validateJSON = (str) => {
    try {
      JSON.parse(str);
    } catch (error) {
      setErrorMsg("Unable to parse JSON!");
      setError(true);
      return;
    }

    setFileContent(str);
    console.log(str);
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
              accept=".json"
              onChange={handleFile}
            />
            <Button color="secondary" variant="contained" component="span">
              Upload credential
            </Button>
          </label>
          <div className="form-alert">
            {error && (
              <Alert variant="outlined" severity="error">
                {errorMsg}
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
