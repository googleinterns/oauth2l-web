/* eslint "require-jsdoc": ["error", {
    "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": true,
        "ClassDeclaration": false
    }
}]*/

import React, { useEffect } from "react";
import "./App.css";
import Credentials from "./components/Credentials";
import {Container,Grid } from '@material-ui/core';
import { Route, NavLink, HashRouter } from "react-router-dom";
import Scopes from "./components/Scopes";
import Button from "./components/Button";
import { getCacheToken } from "./util/apiWrapper";

/**
 * @return {HashRouter} returns webapp as a whole
 */
function App() {
  useEffect(() => {
    const loadSampleResponse = async () => {
      const sampleBody = JSON.stringify({
        requesttype: "fetch",
        args: {
          "--scope": ["cloud-platform", "userinfo.email"],
        },
        needToken: "true",
        uploadcredentials: {
          client_id: "random",
          client_secret: "mock",
          quota_project_id: "data",
          refresh_token: "to",
          type: "use",
        },
      });

      const resp = await getCacheToken(sampleBody);
      console.log(resp); // eslint-disable-line
    };

    loadSampleResponse();
  }, []);

  return (
    <HashRouter>
      <div className="App">
             <img
              src={"clogo.png"}
              width="250"
              alt="This is a logo for Google Cloud"
            />{" "}
         <Route exact path="/" component={Credentials} />{" "}
        <Route path="/Scopes" component={Scopes} />{" "}
        
        <Container>
          <Grid>
              <div style={{ float: "right" }} className="next">
                {" "}
                <NavLink to="/Scopes">
                  <Button name="Next"> </Button>{" "}
                </NavLink>{" "}
              </div>{" "}
          </Grid>
        </Container>{" "}
      </div>{" "}
    </HashRouter>
  );
}
export default App;
