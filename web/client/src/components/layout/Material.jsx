import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { Paper, CssBaseline } from "@material-ui/core";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { blue, red } from "@material-ui/core/colors";
import { Head } from "..";
import PropTypes from "prop-types";
import "../../styles/layout.css";

/**
 * @param {Object} props include children nodes and CSS class for Paper component
 * @return {ThemeProvider} wrapping children nodes in a Material UI theme
 */
export default function MaterialUI(props) {
  const { children, paperClass } = props;
  const [themeType, setThemeType] = useState("dark");

  const setThemeTypeCallBack = (darkMode) => {
    if (darkMode) {
      setThemeType("dark");
    } else {
      setThemeType("light");
    }
  };

  const theme = responsiveFontSizes(
    createMuiTheme({
      palette: {
        type: themeType,
        primary: blue,
        secondary: red,
      },
      overrides: {
        MuiTypography: {
          gutterBottom: {
            marginBottom: 20,
          },
        },
      },
    })
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head callback={(childData) => setThemeTypeCallBack(childData)} />
      <div className="root">
        <Paper className={paperClass}>{children}</Paper>
      </div>
    </ThemeProvider>
  );
}

MaterialUI.propTypes = {
  children: PropTypes.node,
  paperClass: PropTypes.string,
};
