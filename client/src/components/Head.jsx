import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Link,
} from "@material-ui/core";
import "../styles/head.css";

/**
 * @return {AppBar} with Google OAuth2l Playground logo
 */
export default function Head() {
  let openBox;
  if (localStorage.getItem("hasOpened")) {
    openBox = false;
  } else {
    openBox = true;
    localStorage.setItem("hasOpened", true);
  }
  const [open, setOpen] = useState(openBox);
  return (
    <AppBar className="header" aria-label="Web Page Header">
      <Toolbar>
        <Button onClick={() => setOpen(true)}>
          <img
            src="clogo.png"
            width="250"
            alt="This is a logo for OAuth2l Playground"
          />
        </Button>
      </Toolbar>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        fullWidth
        maxWidth="md"
      >
        <DialogContent dividers aria-label="Welcome Container">
          <Typography variant="body1" className="welcome-body" gutterBottom>
            Welcome to the OAuth2l Authentication Playground! This application
            is based upon the Google&apos;s{" "}
            <Link href="https://github.com/google/oauth2l/blob/master/README.md">
              OAuth2l
            </Link>{" "}
            CLI tool. Here you will be able to interactively experiment with all
            the authentication flow supported in GCP and fetch OAuth 2.0 access
            token. For more information about using OAuth2.0 access tokens,
            please click{" "}
            <Link href="https://developers.google.com/identity/protocols/oauth2#2.-obtain-an-access-token-from-the-google-authorization-server.">
              {" "}
              here
            </Link>
            .
          </Typography>
          <Typography variant="body1" className="welcome-body" gutterBottom>
            Before getting started, please obtain an OAuth credential file
            (either an OAuth client ID or a Service Account key). You can
            download the files from the Google Cloud Console or create new OAuth
            credentials file using this{" "}
            <Link href="https://support.google.com/googleapi/answer/6158849?hl=en">
              guide
            </Link>
            . Alternatively, If you have the{" "}
            <Link href="https://cloud.google.com/sdk">Google Cloud SDK</Link>{" "}
            installed, you can use your{" "}
            <strong>application_default_credentials.json</strong> file found in{" "}
            <strong>~/.config/gcloud</strong> folder.
          </Typography>
          <Typography variant="body1" className="welcome-body" gutterBottom>
            To view this box at anytime, click on the button labeled
            <strong> OAuth2l Playground </strong>on the upper lefthand corner.
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
    </AppBar>
  );
}
