import React, {useState} from "react";
import { Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
DialogTitle } from "@material-ui/core";


/**
 * @return {Dialog} dialog box that users will see when the app is rendered. 
 */
export default function WelcomeBox() {
  const [open, setOpen] = useState(true);

  return (
    <Dialog
    open={open}
    onClose={() => {setOpen(false)}}
    fullWidth
  >
    <DialogTitle>
      Welcome to the OAuth2l Playground!</DialogTitle>
    <DialogContent>
      <DialogContentText>
       Dreamland is a freeland kiss me hold me take my hand   
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => {setOpen(false)}} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
  );
}