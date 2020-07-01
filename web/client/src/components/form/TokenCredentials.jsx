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
export default function TokenCredentials(props) {
  const [credFormat, setCredFormat] = useState("file");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const { setFieldValue } = props;

  const handleCredFormat = (e) => {
    const format = e.currentTarget.value;
    setCredFormat(format);
  };

  const handleFile = (e) => {
      if (e.currentTarget.files.length > 0) {
        setSuccess(false);
        const wrongFormat = e.currentTarget.files[0].type !== "application/json";
    
        if (wrongFormat) {
          setErrorMsg("Invalid file format, please use a .json file!");
          setError(true);
        } else {
          setError(false);
          readFile(e.currentTarget.files[0]);
        }
    
        console.log(e.currentTarget.files[0]);
      }
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
        setSuccess(false);
      setErrorMsg("Unable to parse JSON!");
      setError(true);
      return;
    }

    setError(false);
    setSuccess(true);
    setFieldValue("tokenCredentials", str);
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
          onKeyUp={(e) => {validateJSON(e.target.value)}}
          component={TextField}
        />
      ) : null}
      <div className="form-alert">
            {error && (
              <Alert variant="outlined" severity="error">
                {errorMsg}
              </Alert>
            )}
            {success && (
              <Alert variant="outlined" severity="success">
                Credential ready!
              </Alert>
            )}
          </div>
    </Box>
  );
}
