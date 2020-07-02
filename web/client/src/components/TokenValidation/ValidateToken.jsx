import React, { useState } from "react";
import { Form, Formik } from "formik";
import {
  Box,
  TextField,
  Grid,
  Button,
  CircularProgress,
  IconButton,
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
  const [credentialsToken, setCredentialsToken] = useState("");
  const [wantInfo, setWantInfo] = useState(false);
  const [info, setInfo] = useState("");
  const [errMessage, setErrMessage] = useState("");

  /**
   *
   * @param {event} e handler for when the token info button is clicked. Will provide the message from the OAuth2l info command for the token specified.
   */
  function getTokenInfo(e) {
    e.preventDefault();
    setWantInfo(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        commandtype: "info",
        args: {
          token: credentialsToken,
        },
        credential: {
          quota_project_id: "delays-or-traffi-1569131153704",
          refresh_token:
            "1//0dFSxxi4NOTl2CgYIARAAGA0SNwF-L9Ira5YTnnFer1GCZBToGkwmVMAounGai_x4CgHwMAFgFNBsPSK5hBwxfpGn88u3roPrRcQ",
          type: "authorized_user",
        },
        cachetoken: false,
        usetoken: true,
        token: credentialsToken,
      }),
    };
    fetch("http://localhost:8080/", requestOptions)
      .then(async (response) => {
        await response;
        response.text().then(function (data) {
          setInfo(data);
        });
      })
      .catch((error) => {
        setInfo(error.toString());
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
        setCredentialsToken(values["token"]);
        // JSON body for the request
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            commandtype: "fetch",
            args: {
              scope: ["cloud-platform", "userinfo.email"],
            },
            credential: {
              quota_project_id: "delays-or-traffi-1569131153704",
              refresh_token:
                "1//0dFSxxi4NOTl2CgYIARAAGA0SNwF-L9Ira5YTnnFer1GCZBToGkwmVMAounGai_x4CgHwMAFgFNBsPSK5hBwxfpGn88u3roPrRcQ",
              type: "authorized_user",
            },
            cachetoken: false,
            usetoken: true,
            token: values["token"],
          }),
        };
        // Sending the Request
        fetch("http://localhost:8080/", requestOptions)
          .then(async (response) => {
            await response;
            // Indicating whether or not the token was valid of not.
            if (!response.ok) {
              setValid(false);
            } else {
              setValid(true);
            }
            // Outputting error message if there is an error.
            response.text().then(function (data) {
              if (response.stats !== 200) {
                setErrMessage(data);
              }
            });
          })
          .catch((error) => {
            setErrMessage(error.toString());
          });
      }}
      // Schema that prevents user from submitting if a token is not inputted.
      validationSchema={object({
        token: string().required("Must have a token"),
      })}
    >
      {({ handleChange, errors, touched, isSubmitting }) => (
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
          </div>
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
          {/* TextField where error will appear if token cannot be validated, */}
          {!valid && completed && (
            <div className="validation-message-div">
              <form noValidate autoComplete="off">
                <TextField
                  multiline
                  fullWidth
                  variant="outlined"
                  label="Error"
                  value={errMessage}
                  error
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </form>
            </div>
          )}
        </div>
      )}
    </Formik>
  );
}
