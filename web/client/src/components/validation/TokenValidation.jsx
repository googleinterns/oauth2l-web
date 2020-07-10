import React, { useState } from "react";
import { Form, Formik } from "formik";
import { green } from "@material-ui/core/colors";
import {
  Box,
  TextField,
  Grid,
  Button,
  CircularProgress,
  IconButton,
  Typography,
  Collapse,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { object, string } from "yup";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import CancelIcon from "@material-ui/icons/Cancel";
import InfoIcon from "@material-ui/icons/Info";
import "../../styles/form.css";
import "../../styles/validation.css";
import { validateToken } from "../../util/apiWrapper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  iconButton: {
    display: "flex",
    flexDirection: "column",
  },
}));

/**
 * @return {Formik} containing form fields for addding/validating token.
 */
export default function ValidateToken() {
  const [valid, setValid] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [credsToken, setCredsToken] = useState("");
  const [infoVisable, setInfoVisable] = useState(false);
  const [info, setInfo] = useState("");
  const [errorOpen, setErrorOpen] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const classes = useStyles();

  /**
   *
   * @param {object} values holds the inputted token string.
   * Takes the inputted token and test it, returning if the token is valid or not.
   */
  function testToken(values) {
    // Sets the credentialsToken to be the inputted token so that it can be used in the future if user wants the information of the token.
    setCredsToken(values["token"]);
    // JSON body for the request.
    const requestOptions = {
      commandtype: "test",
      args: {
        token: values["token"],
      },
      cachetoken: false,
      usetoken: false,
      token: "",
    };

    // Sending the Request
    validateToken(requestOptions)
      .then(async (response) => {
        if (response.data["OAuth2l Response"] === "0") {
          setValid(true);
          // Indicated that a token was inputted and is ready to be submitted.
          setCompleted(true);
        } else {
          setValid(false);
          // Indicated that a token was inputted and is ready to be submitted.
          setCompleted(true);
        }
      })
      .catch(function (error) {
        setErrorOpen(true);
        setHasError(true);
        setErrMessage(error.toString());
      });
  }
  /**
   *
   * @param {event} e event from when the info button is clicked.
   * handler for when the token info button is clicked. Will provide the message from the OAuth2l info command for the token specified.
   */
  function getTokenInfo(e) {
    e.preventDefault();
    // To indicate the info about the token is wanted
    setInfoVisable(true);
    // Body for the request.
    const requestOptions = {
      commandtype: "info",
      args: {
        token: credsToken,
      },
      cachetoken: false,
      usetoken: false,
      token: "",
    };
    // Sending the request.
    validateToken(requestOptions)
      .then(async (response) => {
        const endofResponse = response.data.indexOf("}");
        // Setting info that will be displayed as the OAuth2l Response from the command.
        setInfo(response.data.substring(22, endofResponse));
      })
      .catch(function (error) {
        setErrorOpen(true);
        setHasError(true);
        setErrMessage(error.toString());
      });
  }

  return (
    <Formik
      initialValues={{ token: "" }}
      onSubmit={async (values) => {
        await testToken(values);
      }}
      // Schema that prevents user from submitting if a token is not inputted.
      validationSchema={object({
        token: string().required("Must have a token"),
      })}
    >
      {({ handleChange, errors, touched, isSubmitting }) => (
        <div>
          <div className="form-text validation">
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="flex-end"
            >
              <Grid item xs>
                <Typography variant="h4">Validate Token</Typography>
              </Grid>
            </Grid>
          </div>
          <div>
            <Grid container alignItems="flex-end" justify="flex-end">
              {/* Indicated whether the token is valid or not. */}
              {completed && valid && (
                <div>
                  {" "}
                  <IconButton
                    className="button-info"
                    disabled
                    classes={{ label: classes.iconButton }}
                  >
                    <CheckCircleIcon style={{ color: green[500] }} />

                    <Typography variant="caption" style={{ color: green[500] }}>
                      Valid Token
                    </Typography>
                  </IconButton>
                  <IconButton
                    className="button-info"
                    onClick={getTokenInfo}
                    classes={{ label: classes.iconButton }}
                  >
                    <InfoIcon />

                    <Typography variant="caption">Get Info</Typography>
                  </IconButton>
                </div>
              )}
              {completed && !valid && (
                <div className="invalid-icon">
                  <IconButton disabled classes={{ label: classes.iconButton }}>
                    <CancelIcon color="error" />

                    <Typography variant="caption" color="error">
                      Invalid Token
                    </Typography>
                  </IconButton>
                </div>
              )}
            </Grid>
            <div>
              {/* Input box where users will input the token to be used. */}
              <Form>
                <Box className="form-box">
                  <TextField
                    multiline
                    fullWidth
                    variant="outlined"
                    label="Token"
                    name="token"
                    onChange={handleChange}
                    error={errors.token && touched.token}
                    helperText={
                      errors.token && touched.token ? "Token Required." : null
                    }
                  />
                </Box>
                <Grid item>
                  <Button
                    startIcon={
                      isSubmitting ? <CircularProgress size="1rem" /> : null
                    }
                    disabled={isSubmitting}
                    color="primary"
                    variant="contained"
                    type="submit"
                  >
                    {isSubmitting ? "Submitting" : "Validate Token"}
                  </Button>
                </Grid>
              </Form>
              {/* Box where token info will appear if users chooses to display it. */}
              {infoVisable && (
                <div className="validation-message-div">
                  <form noValidate autoComplete="off">
                    <TextField
                      multiline
                      fullWidth
                      variant="outlined"
                      label="Info"
                      value={info}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </form>
                </div>
              )}
            </div>
            <div>
              {/* Alert for error in fetching request. */}
              {hasError && (
                <Collapse in={errorOpen} className="collapse-reset">
                  <Alert
                    variant="outlined"
                    severity="error"
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setErrorOpen(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                  >
                    {errMessage}
                  </Alert>
                </Collapse>
              )}
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}
