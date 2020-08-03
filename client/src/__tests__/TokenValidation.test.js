import React from "react";
import {
  fireEvent,
  wait,
  render,
  waitForElement,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { ValidateToken } from "../components";

// test applications use-cases from user's pov. Users access information on a web page and interact with available controls
// assert pm react dom state
// shallow rendering is not used for this as we need to be able to test the child components

describe("Token Validation Component", () => {
  it("renders the page", () => {
    const wrapper = render(<ValidateToken />);
    expect(wrapper).toBeDefined();
  });

  it("displays an error when form is submitted without a token", async () => {
    const { getByText, container } = render(<ValidateToken />);
    // Finding submit button of Token Validation form.
    const button = await waitForElement(() => container.querySelector("Form"));

    // Clicking submit button.
    await wait(() => {
      fireEvent.submit(button);
    });

    expect(getByText("Token Required.")).not.toBeNull();
  });

  it("submits properly when submitted with a token", async () => {
    const { getByTestId, getByText, container } = render(<ValidateToken />);
    // Finding submit button of Token Validation form.
    const button = await waitForElement(() => container.querySelector("Form"));
    // Finding textfield of Token Validation form.
    const tokenInput = await waitForElement(() => getByTestId("token-field"));

    // Entering in token in the texfield.
    await wait(() => {
      fireEvent.change(tokenInput, {
        target: {
          value: "ya.testtoken",
        },
      });
    });

    // Submitting the form.
    await act(async () => {
      fireEvent.submit(button);
    });

    expect(getByText("Submitting")).not.toBeNull();
  });
});
