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
import { TokenType, TokenScopes, TokenCredentials } from "../";
import { object, string } from "yup";
import PropTypes from "prop-types";

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

/**
 * @return {FormikStepper} component using Formik for creating a token
 */
export default function TokenForm() {
  return (
    <FormikStepper
      initialValues={{
        tokenType: "",
        tokenFormat: "",
        tokenScopes: "",
        tokenCredentials: "",
      }}
      onSubmit={async (values) => {
        await sleep(3000);
        console.log(values)
      }}
    >
      <TokenCredentials label="Credentials" />
      <TokenType
        validationSchema={object({
          tokenType: string().required("Must select a token type"),
          tokenFormat: string().required("Must select a token format"),
        })}
        label="Type"
      />
      <TokenScopes label="Scopes" />
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
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

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
          setCompleted(true);
        } else {
          setStep((currStep) => currStep + 1);
        }
      }}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step
                key={child.props.label}
                completed={step > index || completed}
              >
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {cloneElement(currentChild, {setFieldValue})}
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
};
