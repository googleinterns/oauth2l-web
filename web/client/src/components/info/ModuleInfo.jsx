import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  IconButton,
} from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import PropTypes from "prop-types";
import "../../styles/info.css";

/**
 *
 * @param {param} props contains the title of the dialog box and array of strings representing the content of the dialog box
 * @return {Grid} returns Grid component that contains the page
 */
export default function ModuleInfo(props) {
  const { title, content } = props;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid
      container
      justify="flex-end"
      alignItems="flex-start"
      className="step-grid"
      direction="row"
    >
      <IconButton onClick={handleClickOpen}>
        <HelpOutlineIcon />
      </IconButton>

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </DialogTitle>
        <DialogContent dividers>
          {content.map((text, index) => (
            <Typography key={index} gutterBottom>
              {text}
            </Typography>
          ))}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

ModuleInfo.propTypes = {
  title: PropTypes.string,
  content: PropTypes.array,
};
