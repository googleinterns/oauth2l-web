import React, { useState } from "react";
import {
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import "../../styles/form.css";
import ValidateToken from "./ValidateToken";

/**
 * @return {div} containing section for the option of using a token
 */
export default function UseToken() {
  const [isPreviewShown, setPreviewShown] = useState(false);

  const handlePreview = (e) => {
    e.preventDefault();

    if (isPreviewShown) {
      setPreviewShown(false); // Here we change state
    } else {
      setPreviewShown(true); // Here we change state
    }
  };

  return (
    <div>
      <div className="form-text">
        <Typography variant="h4">Submit Your Own Token</Typography>
      </div>
      <div>
        <FormGroup>
          <FormControlLabel
            control={<Switch onChange={handlePreview} color="primary" />}
            label="Use Token"
          />
        </FormGroup>
        {isPreviewShown && <ValidateToken styele={{ marginTop: "1rem" }} />}
      </div>
    </div>
  );
}
