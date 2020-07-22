import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import DarkModeToggle from "react-dark-mode-toggle";
import "../styles/head.css";

/**
 * @return {AppBar} with Google Cloud logo and dark mode toggle
 */
export default function Head(props) {
  // const { setThemeTypeCallback } = props;
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    props.callback(isDarkMode);
  }, [isDarkMode])

  return (
    <AppBar className="header">
      <div className="content-div">
        <img src="clogo.png" width="250" alt="This is a logo for Google Cloud" />
        <div className="dark-mode-toggle">
          <DarkModeToggle
            onChange={setIsDarkMode}
            checked={isDarkMode}
            size='5rem'
            speed={2}
          />
        </div>
      </div>
    </AppBar>
  );
}
