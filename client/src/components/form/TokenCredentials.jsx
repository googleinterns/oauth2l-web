import React, { useState } from "react";
import { Field } from "formik";
import {
  Typography,
  Box,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  Switch,
  TextField as TextFieldMUI,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { TextField } from "formik-material-ui";
import PropTypes from "prop-types";
import "../../styles/form.css";

/**
 * @param {Object} props contains setFieldValue function for updating credentials field manually
 * @return {Box} containing form fields for adding scopes
 */
export default function TokenCredentials(props) {
  const [credFormat, setCredFormat] = useState("file");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [saveCredential, setSaveCredential] = useState(false);

  const { setFieldValue, tokenAvailable, parsedCredential } = props;

  const handleCredFormat = (e) => {
    const format = e.currentTarget.value;
    setCredFormat(format);

    if (format === "saved") {
      setError(false);
      setFieldValue("tokenCredentials", parsedCredential);
    }
  };

  const handleFile = (e) => {
    if (e.currentTarget.files.length > 0) {
      setSuccess(false);
      const wrongFormat = e.currentTarget.files[0].type !== "application/json";

      if (wrongFormat) {
        setErrorMsg("Invalid file format, please use a .json file");
        setError(true);
      } else {
        setError(false);
        readFile(e.currentTarget.files[0]);
      }
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
      setErrorMsg("Unable to parse JSON");
      setError(true);
      return;
    }

    setError(false);
    setSuccess(true);
    setFieldValue("tokenCredentials", str);
  };

  const toggleSave = () => {
    setFieldValue("saveTokenLocally", !saveCredential);
    setSaveCredential((prev) => !prev);
  };

  const saveTokenToggle = () => {
    return (
      <FormControlLabel
        className="form-save-cred-toggle"
        control={
          <Switch
            checked={saveCredential}
            onChange={toggleSave}
            color="primary"
          />
        }
        label="Save credentials for future use"
      />
    );
  };

  return (
    <Box className="form-box">
      <div className="form-text">
        <Typography variant="h5">Upload or enter credentials</Typography>
      </div>
      {saveTokenToggle()}
      <RadioGroup
        row
        name="credentialFormat"
        value={credFormat}
        onChange={handleCredFormat}
      >
        <FormControlLabel
          value="file"
          control={<Radio color="primary" />}
          label="File upload"
        />
        <FormControlLabel
          value="json"
          control={<Radio color="primary" />}
          label="Text input"
        />
        {tokenAvailable ? (
          <FormControlLabel
            value="saved"
            control={<Radio color="primary" />}
            label="Saved credentials"
          />
        ) : null}
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
            <Button variant="contained" component="span">
              Upload credentials
            </Button>
          </label>
        </div>
      ) : credFormat === "json" ? (
        <Field
          // props to identify component in test suite.
          inputProps={{ "data-testid": "credentials-field" }}
          multiline
          rows={15}
          fullWidth
          variant="outlined"
          color="primary"
          label="Paste credentials in JSON format"
          name="tokenCredentials"
          onKeyUp={(e) => {
            validateJSON(e.target.value);
          }}
          component={TextField}
        />
      ) : credFormat === "saved" ? (
        <TextFieldMUI
          multiline
          rows={15}
          fullWidth
          variant="outlined"
          color="primary"
          label="This is your saved credentials"
          defaultValue={parsedCredential}
          InputProps={{
            readOnly: true,
          }}
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
            Credentials ready
          </Alert>
        )}
      </div>
    </Box>
  );
}

TokenCredentials.propTypes = {
  setFieldValue: PropTypes.func,
  tokenAvailable: PropTypes.bool,
  parsedCredential: PropTypes.string,
};
