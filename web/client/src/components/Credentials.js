/* eslint "require-jsdoc": ["error", {
    "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": true,
        "ClassDeclaration": false
    }
}]*/

import React from "react";
import { Field, reduxForm } from "redux-form";
import {
  Container,
  Grid,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  makeStyles,
} from "@material-ui/core";
import submit from "./submit";

const renderRadioType = ({ input, ...rest }) => (
  <FormControl>
    <RadioGroup {...input} {...rest}>
      <FormControlLabel
        value="OAuth"
        control={<Radio color="primary" />}
        label="OAuth"
      />
      <FormControlLabel
        value="JWT"
        control={<Radio color="primary" />}
        label="JWT"
      />
    </RadioGroup>
  </FormControl>
);

const renderRadioFormat = ({ input, ...rest }) => (
  <FormControl component="fieldset">
    <RadioGroup {...input} {...rest}>
      <FormControlLabel
        value="Bare"
        control={<Radio color="primary" />}
        label="Bare"
      />
      <FormControlLabel
        value="Header"
        control={<Radio color="primary" />}
        label="Header"
      />
      <FormControlLabel
        value="JSON"
        control={<Radio color="primary" />}
        label="JSON"
      />
      <FormControlLabel
        value="JSON_Compact"
        control={<Radio color="primary" />}
        label="JSON_Compact"
      />
      <FormControlLabel
        value="Pretty"
        control={<Radio color="primary" />}
        label="Pretty"
      />
    </RadioGroup>
  </FormControl>
);

const useStytle = makeStyles((theme) => ({
  root: {
    flexGrow: 3,
    margin: theme.spacing(8),
    borderRadius: 5,
    boxShadow: "0 1px 5px ",
    padding: theme.spacing(8),
  },
  inline: {
    display: "inline",
  },
}));

/**
 *
 * @return {div} returns the page that contains the ability to choose the type and type
 */
function Credentials({ error, handleSubmit, pristine, reset, submitting }) {
  const classes = useStytle();
  return (
    <div className={classes.root}>
      <Container>
        <form onSubmit={handleSubmit(submit)}>
          <Typography variant="h5">Choose token type </Typography>
          <Field name="type" component={renderRadioType} />
          <Typography variant="h5">Choose token format</Typography>
          <Field name="format" component={renderRadioFormat} />
          {error && <strong>{error}</strong>}
          <div className="btn1">
            <Button variant="outlined" color="primary" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Container>
      <div style={{ float: "right" }} className="next">
        <Button name="Next"></Button>
      </div>
    </div>
  );
}

export default reduxForm({
  form: "Credentials",
})(Credentials);
