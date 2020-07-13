import React, { useState } from "react";
import MaterialUI from "./components/layout/Material";
import {
  TokenForm,
  ValidateToken,
  TokenDisplay,
  ModuleInfo,
} from "./components";
import { Grid } from "@material-ui/core";
import "./styles/app.css";

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
            <ModuleInfo
              title="Getting a Token"
              content={[
                "This module is used to generate a OAuth access token. It is equivalent to using the fetch and the header OAuth2l request.",
                "To obtain the token, must first choose from the form the type and format of the token, as well as enter the scopes they" +
                  "want the token to be based on. Then, a credentials file must" +
                  "be submitted, either as a JSON file or a JSON body",
                "Once all the requirements are submitted, an access token will be" +
                  "returned, based on the format requested.",
              ]}
            />
            <Grid item className="main-content">
              <TokenForm parentCallback={callBackToken} />
            </Grid>
          </MaterialUI>
        </Grid>
        <Grid item xs>
          <MaterialUI paperClass="paper-bottom">
            <Grid item className="main-content token-display-grid">
              <TokenDisplay token={token} />
            </Grid>
          </MaterialUI>
        </Grid>
      </Grid>
      <Grid item xs>
        <Grid container direction="column">
          <Grid item xs>
            <MaterialUI paperClass="paper-top">
              <ModuleInfo
                title="Validating Token"
                content={[
                  "This module is used for validating an OAuth access token and getting the info from a valid token. It is the equivalent of using the test and info OAuth2l command.",
                  "When an OAuth access token is submitted, an icon will appear, stating whether the token is valid or not.",
                  "If the token is valid, a information button will appear, which will display the info of the token when clicked.",
                ]}
              />
              <Grid item xs className="main-content">
                <ValidateToken />
              </Grid>
            </MaterialUI>
          </Grid>
          <Grid item xs>
            <MaterialUI paperClass="paper-bottom">
              <ModuleInfo title="" content={[]} />
              <Grid item xs className="main-content">
                <h2>Replace with http request module!</h2>
              </Grid>
            </MaterialUI>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
