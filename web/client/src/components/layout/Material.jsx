import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { Paper, CssBaseline } from "@material-ui/core";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import { Head } from "..";
import "../../styles/layout.css";

export default function MaterialUI(props) {
  const { children, paperClass } = props;
  console.log(paperClass);
  const theme = responsiveFontSizes(
    createMuiTheme({
      palette: {
        type: "dark",
        primary: blue,
        secondary: {
          main: "#ce93d8",
        },
      },
    })
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head />
      <div className="root">
        <Paper className={paperClass}>{children}</Paper>
      </div>
    </ThemeProvider>
  );
}
