import React from "react";
import MaterialUI from "./components/layouts/Material";
import { TokenForm } from "./components";
import { Grid } from "@material-ui/core"

/**
 * @return {MaterialUI} themed app
 */
function App() {

  return (
    <Grid container>
      <Grid item xs>
        <MaterialUI>
          <TokenForm />
        </MaterialUI>
      </Grid>
      <Grid item xs>
        <MaterialUI>
          <h2>Replace with token tester!</h2>
        </MaterialUI>
      </Grid>
    </Grid>
  );
}

export default App;
