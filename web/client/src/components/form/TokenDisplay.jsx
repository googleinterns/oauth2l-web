import React from "react";
import { Typography, Button,Grid } from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import PropTypes from "prop-types";
/**
 *
 * @param {string} prop token being passed for display
 * @return {Grid} returns a Grid component that contains the page
 */
export default function TokenDisplay(props) {
  const { token } = props;
  const [copy, setCopy] = React.useState(false);
  return (
    <Grid>
      <Typography variant="h5">Token:</Typography>
      
      <Typography noWrap variant="body1" >
        {token}
      </Typography>
      <CopyToClipboard text={token} onCopy={() => setCopy(true)}>
        <Button variant="contained" color="primary" disabled={copy}>
          Copy to Clipboard
        </Button>
      </CopyToClipboard>
    </Grid>
  );
}

TokenDisplay.propTypes = {
  token: PropTypes.string,
};
