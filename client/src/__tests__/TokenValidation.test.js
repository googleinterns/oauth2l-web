import React from "react";
import {
  fireEvent,
  wait,
  render,
  waitForElement,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
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

  it("displays an error when form in submitted without a token", async () => {
    const { getByText, queryByText, container } = render(<ValidateToken />);
    const button = await waitForElement(() => container.querySelector("Form"));

    await wait(() => {
      fireEvent.submit(button);
    });

    expect(getByText("Token Required.")).not.toBeNull();
    expect(queryByText("Submitting")).toBeNull();
  });

  it("submits properly when submitted with a token", async () => {
    const { getByTestId, getByText, container } = render(<ValidateToken />);
    const button = await waitForElement(() => container.querySelector("Form"));
    const input = await waitForElement(() => getByTestId("token-field"));

    await wait(() => {
      fireEvent.change(input, {
        target: {
          value: "ya.thisisatest",
        },
      });
    });

    await act(async () => {
      fireEvent.submit(button);
    });

    expect(getByText("Submitting")).not.toBeNull();
  });
});
