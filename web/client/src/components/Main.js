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
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  makeStyles,
} from "@material-ui/core";
import submit from "./submit";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

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
  <FormControl>
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
 * @return {div} returns the page that contains the ability to choose the type and format
 */
function Main({ error, handleSubmit }) {
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
        <NavLink to="/Scopes">
          <Button variant="contained" color="primary">
            {" "}
            Next
          </Button>
        </NavLink>
      </div>
    </div>
  );
}

export default reduxForm({
  form: "Main",
})(Main);

renderRadioType.propTypes = {
  input: PropTypes.string,
};

renderRadioFormat.propTypes = {
  input: PropTypes.string,
};

Main.propTypes = {
  error: PropTypes.string,
  handleSubmit: PropTypes.func,
};
