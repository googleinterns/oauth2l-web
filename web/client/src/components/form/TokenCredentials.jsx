import React, { useState } from "react";
import { Field } from "formik";
import { Typography, Box, RadioGroup, Radio, FormControlLabel } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import "../../styles/form.css";

/**
 * @return {Box} containing form fields for adding scopes
 */
export default function TokenCredentials() {
    const [credFormat, setCredFormat] = useState("file")
    
    const handleCredFormat = (e) => {
        setCredFormat(e.currentTarget.value)
    }

  return (
    <Box className="form-box">
      <div className="form-text">
        <Typography variant="h5">Upload or enter credentials</Typography>
      </div>
      <RadioGroup row name="credentialFormat" value={credFormat} onChange={handleCredFormat}>
        <FormControlLabel value="file" control={<Radio />} label="File upload" />
        <FormControlLabel value="json" control={<Radio />} label="Text input" />
      </RadioGroup>
      {credFormat === "file" ? null : <Field
        multiline
        rows={15}
        fullWidth
        variant="outlined"
        label="Paste credential in JSON format"
        name="tokenCredentials"
        component={TextField}
      />}
    </Box>
  );
}
