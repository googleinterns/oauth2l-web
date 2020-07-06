import React from "react";
import MaterialUI from "./components/layout/Material";
import { TokenForm, ValidateToken } from "./components";
import { Grid } from "@material-ui/core";

/**
 * @return {MaterialUI} themed app
 */
function App() {
  return (
    <Grid container>
      <Grid item xs>
        <MaterialUI paperClass="paper-top">
          <TokenForm />
        </MaterialUI>
      </Grid>
      <Grid item xs>
        <Grid container direction="column">
          <Grid item xs>
            <MaterialUI paperClass="paper-top">
              <ValidateToken />
            </MaterialUI>
          </Grid>
          <Grid item xs>
            <MaterialUI paperClass="paper-bottom">
              <h2>Replace with http request module!</h2>
            </MaterialUI>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
