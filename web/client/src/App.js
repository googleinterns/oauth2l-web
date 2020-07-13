import React, { useState } from "react";
import MaterialUI from "./components/layout/Material";
import {
  TokenForm,
  ValidateToken,
  TokenDisplay,
  ReqModule,
} from "./components";
import { Grid } from "@material-ui/core";

/**
 * @return {MaterialUI} themed app
 */
function App() {
  const [token, setToken] = useState("");

  /**
   *
   * @param {string} childData obtains the token value from the TokenForm component
   */
  function callBackToken(childData) {
    setToken(childData);
  }

  return (
    <Grid container>
      <Grid item xs>
        <Grid container direction="column">
          <MaterialUI paperClass="paper-top">
            <TokenForm parentCallback={callBackToken} />
          </MaterialUI>
        </Grid>
        <Grid item xs>
          <MaterialUI paperClass="paper-bottom">
            <TokenDisplay token={token} />
          </MaterialUI>
        </Grid>
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
              <ReqModule />
            </MaterialUI>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
