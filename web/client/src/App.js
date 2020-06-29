import React from "react";
import MaterialUI from "./components/layouts/Material";
import { TokenForm } from "./components";
// import "./App.css";
// import Main from "./components/Main";
// import { Route, HashRouter } from "react-router-dom";
// import Scopes from "./components/Scopes";
// import { getCacheToken } from "./util/apiWrapper";

/**
 * @return {MaterialUI} themed app
 */
function App() {
  // useEffect(() => {
  //   const loadSampleResponse = async () => {
  //     const sampleBody = JSON.stringify({
  //       requesttype: "fetch",
  //       args: {
  //         "--scope": ["cloud-platform", "userinfo.email"],
  //       },
  //       needToken: "true",
  //       uploadcredentials: {
  //         client_id: "random",
  //         client_secret: "mock",
  //         quota_project_id: "data",
  //         refresh_token: "to",
  //         type: "use",
  //       },
  //     });

  //     const resp = await getCacheToken(sampleBody);
  //     console.log(resp); // eslint-disable-line
  //   };

  //   loadSampleResponse();
  // }, []);

  return (
    // <HashRouter>
    //   <AppBar color="primary">
    //     <div className="App">
    //       <img
    //         src={"clogo.png"}
    //         width="250"
    //         alt="This is a logo for Google Cloud"
    //       />
    //     </div>
    //   </AppBar>
    //   <Route exact path="/" component={Main} />
    //   <Route path="/Scopes" component={Scopes} />
    // </HashRouter>
    <MaterialUI>
      <TokenForm />
    </MaterialUI>
  );
}

export default App;
