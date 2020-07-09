import React from "react";
import {
  Typography,
  Button,
  Grid,
  IconButton,
  Collapse,
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
  const { token } = props;
  const [copy, setCopy] = React.useState(false);
  return (
    <Grid>
      <Typography variant="h5">OAuth2l Response:</Typography>

      <Typography noWrap variant="body1" className="form-text">
        {token}
      </Typography>
      <CopyToClipboard text={token} onCopy={() => setCopy(true)}>
        <Button variant="contained" color="primary">
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
          Successfully pasted the token to your clipboard!
        </Alert>
      </Collapse>
    </Grid>
  );
}

TokenDisplay.propTypes = {
  token: PropTypes.string,
};
