import React, { useState } from "react";
import MaterialUI from "./components/layout/Material";
import {
  TokenForm,
  ValidateToken,
  TokenDisplay,
  RequestModule,
  RequestDisplay,
  ModuleInfo,
} from "./components";
import { Grid } from "@material-ui/core";
import "./styles/app.css";

/**
 * @return {MaterialUI} themed app
 */
function App() {
  // const defaultValues = {
  //   tokenType: "",
  //   tokenFormat: "",
  //   tokenScopes: [],
  //   tokenAudience: [],
  //   tokenCredentials: "",
  //   saveTokenLocally: false,
  // };
  // const [values, setValues] = useState(defaultValues);
  const [response, setResponse] = useState(null); // holds the response from the backend
  const [tokenResponseVisable, setTokenResponseVisable] = useState(true); // the state that decides which component to hide/show
  const [httpResponse, setHttpResponse] = useState("");
  const [httpresponseVisable, setHttpResponseVisable] = useState(false);
  /**
   *
   * @param {string} childData obtains the token value from the TokenForm component
   */
  const callBackToken = (childData) => {
    setResponse(childData);
    setTokenResponseVisable(false);
  };

  /**
   *
   * @param {bool} visibility obtains the bool to render the form back and if clicked it resets to the last component
   */

  const backClicked = (visibility) => {
    setTokenResponseVisable(!visibility);
  };
  /**
   * @param {string} childData holds the response of the HTTP request.
   * displaying the page with the HTTP response.
   */
  const callBackHttpResponse = (childData) => {
    setHttpResponse(childData);
    setHttpResponseVisable(true);
  };

  /**
   *
   * @param {bool} visibility boolean condition of the visibility.
   * resets the HTTP request back to the HTTP form.
   */
  const resetHttpRequest = (visibility) => {
    setHttpResponseVisable(visibility);
  };

  return (
    <Grid container>
      <Grid item xs>
        <Grid container direction="column">
          <MaterialUI paperClass="paper-top">
            <ModuleInfo
              title="Requesting a token"
              content={[
                "This module is used to generate an OAuth access token. It is equivalent to using the fetch and header OAuth2l requests.",
                "To obtain the token, you must first choose the type and format of the token, as well as enter the access details for the token. Then, a credentials file must be submitted, either as a JSON file or a JSON body",
                "Once all the requirements are submitted, an access token will be returned based on the format requested.",
              ]}
              hasNote={true}
              note={[
                "To obtain a JWT access token, a service account key must be used as the credentials file",
                "When using a client-id credentials file, after consenting, copy the code in the url to the redirected page and paste it into the dialog box that appears in the application",
              ]}
            />
            <Grid item className="main-content">
              <div style={{ display: tokenResponseVisable ? "block" : "none" }}>
                <TokenForm
                  parentCallback={(childData) => callBackToken(childData)}
                />
              </div>
              <div style={{ display: tokenResponseVisable ? "none" : "block" }}>
                <TokenDisplay
                  token={response}
                  parentGoBack={(visibility) => backClicked(visibility)}
                  tokenResponseVisable={tokenResponseVisable}
                />
              </div>
            </Grid>
          </MaterialUI>
        </Grid>
      </Grid>
      <Grid item xs>
        <Grid container direction="column">
          <Grid item xs>
            <MaterialUI paperClass="paper-top">
              <ModuleInfo
                title="Validating your token"
                content={[
                  "This module is used for validating an OAuth access token and getting the info from a valid token. It is the equivalent of using the test and info OAuth2l command.",
                  "When an OAuth access token is submitted, an icon will appear, stating whether the token is valid or not.",
                  "If the token is valid, an information button will appear, which will display the info of the token when clicked.",
                ]}
                hasNote={true}
                note={["The info for a JWT Token cannot be requested"]}
              />
              <Grid item xs className="main-content">
                <ValidateToken />
              </Grid>
            </MaterialUI>
          </Grid>
          <Grid item xs>
            <MaterialUI paperClass="paper-bottom">
              <ModuleInfo
                title="Use your token for an HTTP request"
                content={[
                  "This module is used for using a OAuth2l access token to make a HTTP request. It is the equivalent of using the curl OAuth2l command.",
                  "To make the request, you must submit the URL to the request, the method of the request, and the token you will be using in the request. You also have the option of entering a request body, headers, and content type of the reponse.",
                  "Once that is all submitted, the request will be made and the response will be displayed.",
                ]}
                hasNote={false}
                note={[]}
              />
              <Grid item xs className="main-content">
                {/* <RequestModule /> */}
                {!httpresponseVisable ? (
                  <RequestModule
                    parentCallback={(childData) =>
                      callBackHttpResponse(childData)
                    }
                  />
                ) : (
                  <RequestDisplay
                    httpResponse={httpResponse}
                    parentCallback={(httpresponseVisable) =>
                      resetHttpRequest(httpresponseVisable)
                    }
                    responseVisable={httpresponseVisable}
                  />
                )}
              </Grid>
            </MaterialUI>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
