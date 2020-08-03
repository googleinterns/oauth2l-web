import React, { useState } from "react";
import {
  Typography,
  Button,
  Grid,
  IconButton,
  Collapse,
  TextField,
} from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import PropTypes from "prop-types";
import "../../styles/form.css";
import { Alert } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
/**
 *
 * @param {string} props token being passed for display
 * @return {Grid} returns a Grid component that contains the page
 */
export default function TokenDisplay(props) {
  const { token, responseVisable } = props;
  const [copy, setCopy] = useState(false);
  return (
    <Grid aria-label="Token Informatin Container">
      <Typography variant="h5">OAuth2l Response:</Typography>

      {responseVisable && (
        <form noValidate autoComplete="off" className="response-box">
          <TextField
            multiline
            fullWidth
            variant="outlined"
            value={token}
            InputProps={{
              readOnly: true,
            }}
          />
        </form>
      )}
      <CopyToClipboard text={token} onCopy={() => setCopy(true)}>
        <Button
          variant="contained"
          color="primary"
          className="copy-button"
          arial-label="Copy to Clipboard Button"
        >
          Copy to Clipboard
        </Button>
      </CopyToClipboard>

      <Collapse in={copy}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setCopy(!copy);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Token copied to clipboard
        </Alert>
      </Collapse>
    </Grid>
  );
}

TokenDisplay.propTypes = {
  token: PropTypes.string,
  responseVisable: PropTypes.bool,
};
