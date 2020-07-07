import React, { useState } from "react";
import axios from "axios";
import { Form, Formik } from "formik";
import {
  Box,
  TextField,
  Grid,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@material-ui/core";
import { object, string } from "yup";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import InfoIcon from "@material-ui/icons/Info";
import "../../styles/form.css";
import "../../styles/validation.css";

/**
 * @return {Formik} containing form fields for addding/validating token.
 */
export default function ValidateToken() {
  const [valid, setValid] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [credsToken, setCredsToken] = useState("");
  const [wantInfo, setWantInfo] = useState(false);
  const [info, setInfo] = useState("");

  /**
   *
   * @param {event} e handler for when the token info button is clicked. Will provide the message from the OAuth2l info command for the token specified.
   */
  function getTokenInfo(e) {
    e.preventDefault();
    // To indicate the the info about the token is wanted
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
    axios
      .post("http://localhost:8080/", requestOptions)
      .then(async (response) => {
        const endofResponse = response.data.indexOf("}");
        // Setting info to be displayed as the OAuth2l Response from the command.
        setInfo(response.data.substring(22, endofResponse));
      });
  }

  return (
    <Formik
      initialValues={{ token: "" }}
      onSubmit={async (values) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        // Indicated the a token was inputted and is ready to be submitted.
        setCompleted(true);
        // Sets the credentialsToken to be the inputted token so that it can be used in the future is user wants the information of the token.
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
        axios
          .post("http://localhost:8080/", requestOptions)
          .then(async (response) => {
            // displaying wether the token in valid or not.
            if (response.data["OAuth2l Response"] === "0") {
              setValid(true);
            } else {
              setValid(false);
            }
          });
      }}
      // Schema that prevents user from submitting if a token is not inputted.
      validationSchema={object({
        token: string().required("Must have a token"),
      })}
    >
      {({ handleChange, errors, touched, isSubmitting }) => (
        <div>
          <div className="form-text" style={{ marginBottom: "1rem" }}>
            <Typography variant="h4">Validate Token</Typography>
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
              {/* Box where token info will appear if users chooses to display it, */}
              {wantInfo && (
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
          </div>
        </div>
      )}
    </Formik>
  );
}
