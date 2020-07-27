import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  DialogTitle,
  Typography,
} from "@material-ui/core";

/**
 * @return {Dialog} dialog box that users will see when the app is rendered.
 */
export default function WelcomeBox() {
  const [open, setOpen] = useState(true);

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      fullWidth
    >
      <DialogTitle>Welcome to the OAuth2l Playground!</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1" gutterBottom>
          To view this box at anytime, click on the button labeled &quot;Oauth2l
          Playground &ldquo; on the upper lefthand corner.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpen(false);
          }}
          color="primary"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
