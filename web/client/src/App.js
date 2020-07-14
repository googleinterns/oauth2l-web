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
<<<<<<< HEAD
              title="Getting a Token"
              content={[
                "This module is used to generate a OAuth access token. It is equivalent to using the fetch and the header OAuth2l request.",
                "To obtain the token, must first choose from the form the type and format of the token, as well as enter the scopes they" +
                  "want the token to be based on. Then, a credentials file must" +
                  "be submitted, either as a JSON file or a JSON body",
                "Once all the requirements are submitted, an access token will be" +
                  "returned, based on the format requested.",
              ]}
              hasNote={true}
              note="To obtain a JWT access token, a service account key must be included as the credentials file "
=======
              title="Requesting a token"
              content={[
                "This module is used to generate an OAuth access token. It is equivalent to using the fetch and header OAuth2l requests.",
                "To obtain the token, you must first choose the type and format of the token, as well as enter the access details for the token. Then, a credentials file must be submitted, either as a JSON file or a JSON body",
                "Once all the requirements are submitted, an access token will be returned based on the format requested.",
              ]}
              hasNote={true}
              note="To obtain a JWT access token, a service account key must be used as the credentials file"
>>>>>>> b13d5362d84d07040be49d54bf57dc968d3444cc
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
<<<<<<< HEAD
                title="Validating Token"
                content={[
                  "This module is used for validating an OAuth access token and getting the info from a valid token. It is the equivalent of using the test and info OAuth2l command.",
                  "When an OAuth access token is submitted, an icon will appear, stating whether the token is valid or not.",
                  "If the token is valid, a information button will appear, which will display the info of the token when clicked.",
=======
                title="Validating your token"
                content={[
                  "This module is used for validating an OAuth access token and getting the info from a valid token. It is the equivalent of using the test and info OAuth2l command.",
                  "When an OAuth access token is submitted, an icon will appear, stating whether the token is valid or not.",
                  "If the token is valid, an information button will appear, which will display the info of the token when clicked.",
>>>>>>> b13d5362d84d07040be49d54bf57dc968d3444cc
                ]}
                hasNote={true}
                note="The info for a JWT Token cannot be requested"
              />
              <Grid item xs className="main-content">
                <ValidateToken />
              </Grid>
            </MaterialUI>
          </Grid>
          <Grid item xs>
            <MaterialUI paperClass="paper-bottom">
              <ModuleInfo title="" content={[]} hasNote={false} note="" />
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
