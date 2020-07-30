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
  Link,
  Divider,
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
  const { title, content, hasNote, note, hasLinks, links } = props;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = createMuiTheme({
    typography: {
      fontSize: 20,
    },
  });

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

      <Dialog fullWidth maxWidth="md" onClose={handleClose} open={open}>
        <DialogTitle onClose={handleClose} disableTypography={true}>
          <Typography className="dialog-title" variant="h6">
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {content.map((text, index) => (
            <Typography
              key={index}
              variant="body1"
              className="dialog-content"
              gutterBottom
            >
              {text}
            </Typography>
          ))}
        </DialogContent>
        {hasNote && (
          <div>
            <Divider />
            <DialogTitle disableTypography={true}>
              <Typography className="subtitle" variant="h6">
                Notes
              </Typography>
            </DialogTitle>
            <DialogContent>
              <ul>
                {note.map((text, index) => (
                  <li key={index}>
                    <Typography
                      variant="body1"
                      className="dialog-content"
                      gutterBottom
                    >
                      {text}
                    </Typography>
                  </li>
                ))}
              </ul>
            </DialogContent>
          </div>
        )}
        {hasLinks && (
          <div>
            <Divider />
            <DialogTitle disableTypography={true}>
              <Typography variant="h6" className="subtitle">
                Helpful Links
              </Typography>
            </DialogTitle>
            <DialogContent>
              {links.map((link, index) => (
                <Typography
                  variant="body1"
                  className="dialog-content"
                  key={index}
                >
                  <Link href={link.url}>{link.name}</Link>
                </Typography>
              ))}
            </DialogContent>
          </div>
        )}
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
  hasNote: PropTypes.bool,
  note: PropTypes.array,
  hasLinks: PropTypes.bool,
  links: PropTypes.object,
};
