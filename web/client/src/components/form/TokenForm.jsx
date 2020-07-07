import React, { useState, cloneElement } from "react";
import { Formik, Form } from "formik";
import {
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { TokenType, TokenAccess, TokenCredentials } from "../";
import { object, string } from "yup";
import PropTypes from "prop-types";

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

/**
 * @return {FormikStepper} component using Formik for creating a token
 */
export default function TokenForm() {
  const [secondLabel, setLabel] = useState("");
  const [tokenType, setTokenType] = useState("");

  return (
    <FormikStepper
      initialValues={{
        tokenType: "",
        tokenFormat: "",
        tokenScopes: "",
        tokenAudience: "",
        tokenCredentials: "",
      }}
      onSubmit={async () => {
        await sleep(3000);
      }}
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
            ? { tokenScopes: string().required(`Must include scopes}`) }
            : tokenType === "JWT"
            ? { tokenAudience: string().required(`Must include audience}`) }
            : {}),
        })}
        label={secondLabel}
      />
      <TokenCredentials
        validationSchema={object({
          tokenCredentials: string()
            .required("Must include credential!")
            .min(1, "Must include credential!"),
        })}
        label="Credentials"
      />
    </FormikStepper>
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
