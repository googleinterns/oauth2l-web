import React, { useState } from "react";
import { Formik, Form } from "formik";
import {
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { TokenType, TokenScopes } from "../";
import { object, string } from "yup";

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

export default function TokenForm() {
  return (
    <FormikStepper
      initialValues={{
        tokenType: "",
        tokenFormat: "",
        tokenScopes: "",
      }}
      onSubmit={async (values) => {
        await sleep(3000);
        console.log("values", values);
      }}
    >
      <FormikStep
        validationSchema={object({
          tokenType: string().required("Must select a token type"),
          tokenFormat: string().required("Must select a token format"),
        })}
        label="Type"
      >
        <TokenType />
      </FormikStep>
      <FormikStep label="Scopes">
        <TokenScopes />
      </FormikStep>
    </FormikStepper>
  );
}

export function FormikStep(props) {
  const { children } = props;
  return <>{children}</>;
}

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
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((currStep) => currStep + 1);
        }
      }}
    >
      {({ isSubmitting }) => (
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
          {currentChild}
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
