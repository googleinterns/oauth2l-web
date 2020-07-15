import React from "react";
import AppBar from "@material-ui/core/AppBar";
import "../styles/head.css"

/**
 * @return {AppBar} with Google Cloud logo
 */
export default function Head() {
  return (
    <AppBar className="header">
      <img src="clogo.png" width="250" alt="This is a logo for Google Cloud" />
    </AppBar>
  );
}
