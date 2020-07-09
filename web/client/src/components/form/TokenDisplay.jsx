import React from "react";
import { Typography, Button } from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import PropTypes from "prop-types";
/**
 *
 * @param {string} prop token being passed for display
 * @return {div} returns a card so the token stands
 */
export default function TokenDisplay(props) {
  const { token } = props;
  const [copy, setCopy] = React.useState(false);
  return (
    <div>
      <Typography variant="h5">Token:</Typography>
      <Typography variant="body1" paragraph>
        {token}
      </Typography>
      <CopyToClipboard text={token} onCopy={() => setCopy(true)}>
        <Button variant="contained" color="primary" disabled={copy}>
          Copy to Clipboard
        </Button>
      </CopyToClipboard>
    </div>
  );
}

TokenDisplay.propTypes = {
  token: PropTypes.string,
};
