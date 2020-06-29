import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Button } from "@material-ui/core";
import { TokenType, TokenScopes } from "../";

export default function TokenForm() {
  return (
    <FormikStepper
      initialValues={{
        tokenType: "",
        TokenFormat: "",
      }}
      onSubmit={() => {}}
    >
      <TokenType />
      <TokenScopes />
    </FormikStepper>
  );
}

export function FormikStepper(props) {
  const { children } = props;
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];

  const isLastStep = () => {
    return step === childrenArray.length - 1;
  };

  return (
    <Formik
      {...props}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
        } else {
          setStep((currStep) => currStep + 1);
        }
      }}
    >
      <Form>
        {currentChild}
        {step > 0 ? (
          <Button onClick={() => setStep((currStep) => currStep - 1)}>
            Back
          </Button>
        ) : null}
        <Button type="submit">{isLastStep() ? "Get Token" : "Next"}</Button>
      </Form>
    </Formik>
  );
}
