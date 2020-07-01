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
} from "@material-ui/core";
import { object, string } from "yup";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import "../../styles/form.css";
import "../../styles/validation.css";
import InfoIcon from "@material-ui/icons/Info";

/**
 * @return {Formik} containing form fields for addding/validating token
 */
export default function ValidateToken() {
  const [valid, setValid] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [info, setInfo] = useState("");
  const [wantInfo, setWantInfo] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [credsToken, setCredsToken] = useState("");

  /**
   *
   * @param {event} e handler for when the token info button is clicked.
   */
  function handleClick(e) {
    e.preventDefault();
    setWantInfo(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        commandtype: "info",
        args: {
          token: credsToken,
        },
        cachetoken: false,
        usetoken: true,
        token: credsToken,
      }),
    };
    fetch("http://localhost:8080/", requestOptions)
      .then(async (response) => {
        await response;
        setInfo(response);
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
        setCompleted(true);
        setCredsToken(values["token"]);
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            commandtype: "fetch",
            args: {
              scope: ["cloud-platform", "userinfo.email"],
            },
            cachetoken: false,
            usetoken: true,
            token: values["token"],
          }),
        };
        fetch("http://localhost:8080/", requestOptions)
          .then(async (response) => {
            await response;
            if (!response.ok) {
              setValid(true);
            } else {
              setValid(true);
            }
          })
          .catch((error) => {
            setErrMessage(error.toString());
          });
      }}
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
            // s
          >
            {completed && valid && (
              <div>
                {" "}
                <CheckCircleIcon color="primary" />
                <IconButton className="button-info" onClick={handleClick}>
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
          {wantInfo && (
            <div className="validation-message-div">
              <Box
                className="validation-message-box"
                border={1}
                bgcolor="background.paper"
                m="1"
                borderColor="text.secondary"
              >
                {" "}
                <div className="validation-message">
                  <Typography variant="h5" gutterBottom>
                    {info}
                  </Typography>
                </div>
              </Box>
            </div>
          )}
          {!valid && completed && (
            <div className="validation-message-div">
              <Box
                className="validation-message-box"
                border={1}
                bgcolor="background.paper"
                m="1"
                borderColor="text.disabled"
              >
                <div className="validation-message">
                  <Typography variant="h5" gutterBottom>
                    {errMessage}
                  </Typography>
                </div>
              </Box>
            </div>
          )}
        </div>
      )}
    </Formik>
  );
}
