import React, { useState, cloneElement } from "react";
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
import { getCacheToken } from "../../util/apiWrapper";

/**
 * @param {param} props passes a callback function that sends the token back to the parent
 * @return {FormikStepper} component using Formik for creating a token
 */
export default function TokenForm(props) {
  const [secondLabel, setLabel] = useState("");
  const [tokenType, setTokenType] = useState("");
  const [requestBody, setRequestBody] = useState(null);
  const [openBox, setOpenBox] = useState(false);
  const [code, setCode] = useState("");
  /**
   *
   * @param {string} token variable that holds the token
   */
  const sendToken = (token) => {
    props.parentCallback(token);
  };
  /**
   * @param {JSON} values contains the scopes/audience, type, format and credentials that the user put
   * calls apiWrapper in order to request the token from the backend
   */

  const getTokenWithCode = async () => {
    setOpenBox(false);
    requestBody["code"] = code;

    const Response = await getCacheToken(requestBody);
    if (typeof Response["error"] === undefined) {
      sendToken(Response["error"]);
    } else {
      const tokenBeginning =
        Response["data"]["oauth2lResponse"].indexOf("code:") + 5;
      sendToken(
        Response["data"]["oauth2lResponse"].substring(
          tokenBeginning,
          Response["data"]["oauth2lResponse"].length
        )
      );
    }
  };

  const getToken = async (values) => {
    const tokenCred = JSON.parse(values.tokenCredentials);
    let finalCredentials;
    if (
      typeof tokenCred["web"] !== undefined &&
      typeof tokenCred["installed"] === undefined
    ) {
      finalCredentials = tokenCred["web"];
    } else if (
      typeof tokenCred["web"] === undefined &&
      typeof tokenCred["installed"] !== undefined
    ) {
      finalCredentials = tokenCred["installed"];
    } else {
      finalCredentials = tokenCred;
    }
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

    const Body = {
      commandtype: "fetch",
      args: {
        scope: userScopes,
        audience: userAudience,
        output_format: userFormat,
        type: values["tokenType"].toLowerCase(),
      },
      credential: finalCredentials,
      cachetoken: true,
      usetoken: false,
    };
    setRequestBody(Body);

    const Response = await getCacheToken(Body);
    if (typeof Response["error"] === undefined) {
      sendToken(Response["error"]);
    } else {
      if (
        typeof tokenCred["web"] !== undefined &&
        typeof tokenCred["installed"]
      ) {
        if (Response["data"]["oauth2lResponse"].indexOf("following") !== -1) {
          window.open(Response["data"]["oauth2lResponse"].substring(46, 308));
          setOpenBox(true);
        } else {
          sendToken(Response["data"]["oauth2lResponse"]);
        }
      } else {
        sendToken(Response["data"]["oauth2lResponse"]);
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
        />
      </FormikStepper>
      <Dialog
        open={openBox}
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
  const { children } = props;
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const currentChild = childrenArray[step];

  const isLastStep = () => {
    return step === childrenArray.length - 1;
  };

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setDone(true);
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
  onSubmit: PropTypes.func,
  setSecondLabel: PropTypes.func,
};

TokenForm.propTypes = {
  parentCallback: PropTypes.func,
};
