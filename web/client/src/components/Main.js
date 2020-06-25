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
        id="type.oauth"
      />
      <FormControlLabel
        value="JWT"
        control={<Radio color="primary" />}
        label="JWT"
        id="type.jwt"
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
        id="format.bare"
      />
      <FormControlLabel
        value="Header"
        control={<Radio color="primary" />}
        label="Header"
        id="format.header"
      />
      <FormControlLabel
        value="JSON"
        control={<Radio color="primary" />}
        label="JSON"
        id="format.json"
      />
      <FormControlLabel
        value="JSON_Compact"
        control={<Radio color="primary" />}
        label="JSON_Compact"
        id="format.json_compact"
      />
      <FormControlLabel
        value="Pretty"
        control={<Radio color="primary" />}
        label="Pretty"
        id="format.pretty"
      />
    </RadioGroup>
  </FormControl>
);

const useStytle = makeStyles((theme) => ({
  root: {
    flexGrow: 3,
    margin: theme.spacing(20),
    borderRadius: 5,
    boxShadow: "0 1px 5px ",
    padding: theme.spacing(10),
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
    <div className={classes.root} width={{ width: "75%" }}>
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
