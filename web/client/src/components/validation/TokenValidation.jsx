import React, { useState } from "react";
import { Form, Formik } from "formik";
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

/**
 * @return {Formik} containing form fields for addding/validating token.
 */
export default function ValidateToken() {
  const [valid, setValid] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [credsToken, setCredsToken] = useState("");
  const [S, setWantInfo] = useState(false);
  const [info, setInfo] = useState("");
  const [errorOpen, setErrorOpen] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  /**
   *
   * @param {object} values holds the inputted token string.
   * Takes the inputted token and test it, returning if the token is valid or not.
   */
  function testToken(values) {
    // Indicated that a token was inputted and is ready to be submitted.
    setCompleted(true);
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
        console.log(response.data)
        if (response.data["oauth2lResponse"] === "0") {
          setValid(true);
        } else {
          setValid(false);
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
  async function getTokenInfo(e) {
    e.preventDefault();
    // To indicate the info about the token is wanted
    setWantInfo(true);
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
        // Setting info that will be displayed as the OAuth2l Response from the command.
        setInfo(response.data["oauth2lResponse"]);
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
              alignItems="flex-start"
            >
              <Grid item xs>
                <Typography variant="h4">Validate Token</Typography>
              </Grid>
            </Grid>
          </div>
          <div>
            <Grid
              container
              alignItems="flex-start"
              justify="flex-end"
              direction="row"
            >
              {/* Indicated whether the token is valid or not. */}
              {completed && valid && (
                <div>
                  {" "}
                  <CheckCircleIcon color="primary" />
                  <IconButton className="button-info" onClick={getTokenInfo}>
                    <InfoIcon />
                  </IconButton>
                </div>
              )}
              {completed && !valid && (
                <div className="invalid-icon">
                  <CancelIcon color="primary" />
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
              {S && (
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
