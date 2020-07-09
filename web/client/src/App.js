import React, { useState } from "react";
import MaterialUI from "./components/layout/Material";
import { TokenForm, ValidateToken, TokenDisplay } from "./components";
import { Grid } from "@material-ui/core";

/**
 * @return {MaterialUI} themed app
 */
function App() {
  const [token, setToken] = useState("");

  /**
   *
   * @param {*} childData obtains the token value from the TokenForm component
   */
  function callBackToken(childData) {
    if (childData["error"] !== undefined) {
      setToken(childData["error"].toString());
    } else {
      setToken(childData['data']["Token"]);
    }
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
              <h2>Replace with http request module!</h2>
            </MaterialUI>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
