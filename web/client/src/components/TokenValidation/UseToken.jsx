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
 * @return {div} containing section for the option of using a token.
 */
export default function UseToken() {
  const [useToken, setUseToken] = useState(false);

  // Handler to allow users to input a token if use token is toggled.
  const showTokenInput = (e) => {
    e.preventDefault();

    if (useToken) {
      setUseToken(false);
    } else {
      setUseToken(true);
    }
  };

  return (
    <div>
      <div className="form-text">
        <Typography variant="h4">Submit Your Own Token</Typography>
      </div>
      <div>
        {/* Toggle for users to indicate whether they want to use a token. */}
        <FormGroup>
          <FormControlLabel
            control={<Switch onChange={showTokenInput} color="primary" />}
            label="Use Token"
          />
        </FormGroup>
        {useToken && <ValidateToken style={{ marginTop: "1rem" }} />}
      </div>
    </div>
  );
}
