import React, { useState, useEffect, cloneElement } from "react";
import { Formik, Form } from "formik";
import {
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  CircularProgress,
  DialogTitle,
  DialogContent,
  Dialog,
  TextField,
  DialogActions,
} from "@material-ui/core";
import { TokenType, TokenAccess, TokenCredentials } from "../";
import { object, string } from "yup";
import PropTypes from "prop-types";
import { getOAuthToken, getNewCredentialToken } from "../../util/apiWrapper";

// Time before the expiry of the credential token to request a new token in milliseconds
const timeBeforeExpiry = 60000;

/**
 * @param {param} props passes a callback function that sends the token back to the parent
 * @return {FormikStepper} component using Formik for creating a token
 */
export default function TokenForm(props) {
  const [secondLabel, setLabel] = useState("");
  const [tokenType, setTokenType] = useState("");
  const [credentialsToken, setCredentialsToken] = useState("");
  const [parsedCredential, setParsedCredential] = useState("");
  const [loadedInterval, setLoadedInterval] = useState(false);
  const [tokenFormat, setTokenFormat] = useState("");
  const [requestBody, setRequestBody] = useState(null);
  const [openCodeBox, setCodeOpenBox] = useState(false);
  const [code, setCode] = useState("");
  const { parentCallback, values, isReset } = props;
  const sentValues = useState(values);
  /**
   * @param {string} token variable that holds the token
   * @param {object} values variable that holds the previous answers that the user provided
   */
  const sendToken = (token, values) => {
    parentCallback(token, values);
  };

  useEffect(() => {
    const newTokenCall = async () => {
      const body = {
        token: credentialsToken,
      };
      const response = await getNewCredentialToken(body);

      setCredentialsToken(response["data"]["token"]);
    };

    if (!loadedInterval && credentialsToken.length > 0) {
      try {
        const credentialObject = JSON.parse(
          atob(credentialsToken.split(".")[1])
        )["UploadCredentials"];
        setParsedCredential(JSON.stringify(credentialObject, null, 2));
      } catch (error) {
        setParsedCredential("Unable to parse credential payload");
      }

      const expTime = JSON.parse(atob(credentialsToken.split(".")[1]))["exp"];
      const timeDelta = expTime * 1000 - Date.now();

      setInterval(newTokenCall, timeDelta - timeBeforeExpiry);
      setLoadedInterval(true);
    }
  }, [credentialsToken, loadedInterval]);

  /**
   *
   * @param {string} cmdResponse holds the response from the backend.
   * @return {string} OAuth2l access token from the backend.
   */
  const extractToken = (cmdResponse) => {
    // Getting rid of white space.
    cmdResponse = cmdResponse.replace(/\s+/g, "");
    // Extracting the token from the cmd Response.
    let token = cmdResponse.match(/(?<=code:)(.*)/)[1];
    // Prettifying if token format is JSON or JSON Compact
    if (tokenFormat === "JSON" || tokenFormat === "JSON Compact") {
      token = JSON.stringify(JSON.parse(token), null, 2);
    }
    return token;
  };

  /**
   * Second command to handle client id. Calls apiWrapper with original request with
   * the additional code to be inputted.
   */
  const getTokenWithCode = async () => {
    setCodeOpenBox(false);
    requestBody["code"] = decodeURIComponent(code);
    const Response = await getOAuthToken(requestBody);
    if (typeof Response["error"] === undefined) {
      sendToken(Response["error"]);
    } else {
      const token = extractToken(Response["data"]["oauth2lResponse"]);
      sendToken(token, sentValues);
    }
  };

  /**
   *
   * @param {string} cmdResponse holds the response from the backend.
   * @return {string} OAuth2l access token from the backend.
   */
  const getURL = (cmdResponse) => {
    // Getting rid of whitespace.
    cmdResponse = cmdResponse.replace(/\s+/g, "");
    // Extracting url from cmd response.
    const url = cmdResponse.match(/(?<=browser:)(.*)(?=Enter)/)[1];
    return url;
  };

  const getToken = async (values) => {
    let userScopes;
    let userAudience;
    if (values.tokenScopes.length === 0) {
      userAudience = values.tokenAudience;
    } else {
      userScopes = values.tokenScopes;
    }
    let userFormat;
    if (values.tokenFormat === "JSON Compact") {
      userFormat = "json_compact";
    } else {
      userFormat = values.tokenFormat.toLowerCase();
    }
    setTokenFormat(values.tokenFormat);

    const useUploadedCredential = values.tokenCredentials.length > 0;

    let finalCredentials;
    if (useUploadedCredential) {
      finalCredentials = JSON.parse(values.tokenCredentials);
    }

    const body = useUploadedCredential
      ? {
          commandtype: "fetch",
          args: {
            scope: userScopes,
            audience: userAudience,
            output_format: userFormat,
            type: values.tokenType.toLowerCase(),
          },
          credential: finalCredentials,
          cachetoken: values.saveTokenLocally,
          usetoken: false,
        }
      : {
          commandtype: "fetch",
          args: {
            scope: userScopes,
            audience: userAudience,
            output_format: userFormat,
            type: values.tokenType.toLowerCase(),
          },
          token: finalCredentials,
          cachetoken: values.saveTokenLocally,
          usetoken: false,
        };
    setRequestBody(body);

    const response = await getOAuthToken(body);
    if (typeof response["error"] === undefined) {
      sendToken(response["error"]);
    } else {
      if (response["data"]["oauth2lResponse"].indexOf("link") !== -1) {
        const url = getURL(response["data"]["oauth2lResponse"]);
        window.open(url);
        setCodeOpenBox(true);
      } else if (values.saveTokenLocally) {
        const token = response["data"]["token"];
        setCredentialsToken(token);
        sendToken(response["data"]["oauth2lResponse"], values);
      } else {
        sendToken(response["data"]["oauth2lResponse"], values);
      }
    }
  };

  return (
    <div>
      <FormikStepper
        initialValues={{
          tokenType: "",
          tokenFormat: "",
          tokenScopes: [],
          tokenAudience: [],
          tokenCredentials: "",
          saveTokenLocally: false,
        }}
        onSubmit={(values) => getToken(values)}
        setSecondLabel={(value) => {
          setTokenType(value);
          if (value === "OAuth") {
            setLabel("Scopes");
          } else if (value === "JWT") {
            setLabel("Audience");
          }
        }}
        isReset={isReset}
      >
        <TokenType
          validationSchema={object({
            tokenType: string().required("Must select a token type"),
            tokenFormat: string().required("Must select a token format"),
          })}
          label="Type"
        />
        <TokenAccess
          validationSchema={object({
            ...(tokenType === "OAuth"
              ? { tokenScopes: string().required(`Must include scopes`) }
              : tokenType === "JWT"
              ? { tokenAudience: string().required(`Must include audience`) }
              : {}),
          })}
          label={secondLabel}
        />
        <TokenCredentials
          validationSchema={object({
            tokenCredentials: string()
              .required("Must include credential")
              .min(1, "Must include credential"),
          })}
          label="Credentials"
          tokenAvailable={credentialsToken.length > 0}
          parsedCredential={parsedCredential}
        />
      </FormikStepper>
      <Dialog
        open={openCodeBox}
        onClose={getTokenWithCode}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Enter Code</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              margin="dense"
              fullWidth
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button style={{ float: "right" }} onClick={getTokenWithCode}>
              Submit
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={getTokenWithCode} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

/**
 * @param {Object} props include children nodes and onSubmit function for rendering forms
 * @return {Formik} component for showing one child form at a time
 */
export function FormikStepper(props) {
  const { children, isReset } = props;
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(isReset ? 0 : childrenArray.length - 1);

  const [done, setDone] = useState(false);
  const currentChild = childrenArray[step];
  const isLastStep = () => {
    return step === childrenArray.length - 1;
  };

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values) => {
        if (isLastStep()) {
          setDone(true);
          await props.onSubmit(values);
        } else {
          if (step === 0) {
            props.setSecondLabel(values.tokenType);
          }
          setStep((currStep) => currStep + 1);
        }
      }}
    >
      {({ isSubmitting, setFieldValue, errors, touched }) => (
        <Form>
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step key={child.props.label} completed={step > index || done}>
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {cloneElement(currentChild, { setFieldValue, errors, touched })}
          <Grid container spacing={2}>
            {step > 0 ? (
              <Grid item>
                <Button
                  disabled={isSubmitting}
                  color="primary"
                  variant="contained"
                  onClick={() => setStep((currStep) => currStep - 1)}
                >
                  Back
                </Button>
              </Grid>
            ) : null}
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
                {isSubmitting
                  ? "Submitting"
                  : isLastStep()
                  ? "Get Token"
                  : "Next"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

FormikStepper.propTypes = {
  children: PropTypes.node,
  isReset: PropTypes.bool,
  onSubmit: PropTypes.func,
  setSecondLabel: PropTypes.func,
};

TokenForm.propTypes = {
  parentCallback: PropTypes.func,
  values: PropTypes.object,
  isReset: PropTypes.bool,
};
