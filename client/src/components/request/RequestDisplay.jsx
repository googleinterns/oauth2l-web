import React from "react";
import { Typography, TextField, Box, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import "../../styles/form.css";

/**
 *
 * @param {func} props response being passed for display.
 * @return {Box}  returns a box component that contains the page
 */
export default function RequestDisplay(props) {
  const httpResponse = props.httpResponse;

  /**
   *
   * @param {bool} visibility bool of whether or not the response display should be visable.
   * sends back the bool so that parent can display HTTP Request for instead of the response page.
   */
  const resetResponse = (visibility) => {
    props.parentCallback(visibility);
  };

  return (
    <Box className="form-box" aria-label="Request Container">
      <div className="form-text">
        <Typography variant="h5">Response/Request</Typography>
      </div>
      <form noValidate autoComplete="off">
        <TextField
          multiline
          fullWidth
          variant="outlined"
          value={httpResponse}
          InputProps={{
            readOnly: true,
          }}
        />
      </form>
      <Button
        onClick={(visibility) => resetResponse(false)}
        className="form-reset"
        variant="contained"
      >
        Reset
      </Button>
    </Box>
  );
}

RequestDisplay.propTypes = {
  httpResponse: PropTypes.string,
  parentCallback: PropTypes.func,
};
