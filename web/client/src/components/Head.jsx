import React from "react";
import AppBar from "@material-ui/core/AppBar";

export default function Head() {
  return (
    <AppBar className="header">
      <img src="clogo.png" width="250" alt="This is a logo for Google Cloud" />
    </AppBar>
  );
}
