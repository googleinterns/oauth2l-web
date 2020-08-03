import React from "react";
import {
  fireEvent,
  wait,
  render,
  waitForElement,
} from "@testing-library/react";
import { RequestModule } from "../components";
import { act } from "react-dom/test-utils";

describe("Request Module Component", () => {
  it("renders the page", () => {
    const wrapper = render(<RequestModule />);
    expect(wrapper).toBeDefined();
  });

  it("displays errors when form is submitted without a token, url, and HTTP method.", async () => {
    const { getByText, container } = render(<RequestModule />);
    // Finding button to submit request form.
    const button = await waitForElement(() => container.querySelector("Form"));

    // Submitting the form.
    await wait(() => {
      fireEvent.submit(button);
    });

    expect(getByText("Token required.")).not.toBeNull();
    expect(getByText("HTTP method required.")).not.toBeNull();
    expect(getByText("URL required.")).not.toBeNull();
  });

  it("displays optional dialog box when option button is clicked", async () => {
    const { getByText, getByTestId } = render(<RequestModule />);
    // Finding the button that shows the request options.
    const button = await waitForElement(() => getByText("Options"));

    // Clicking the options button.
    await wait(() => {
      fireEvent.click(button);
    });

    expect(getByTestId("option-menu")).not.toBeNull();
  });

  it("displays optional header box when 'Add Header' is clicked in the options menu", async () => {
    const { getByText, getByTestId } = render(<RequestModule />);
    // Finding the button that shows the request options
    const button = await waitForElement(() => getByText("Options"));

    // Clicking the options button.
    await wait(() => {
      fireEvent.click(button);
    });

    // Finding button to add the request headers.
    const headerButton = await waitForElement(() => getByText("Add Header"));
    // Clicking the button to add the request headers.
    await wait(() => {
      fireEvent.click(headerButton);
    });

    expect(getByTestId("header-box")).not.toBeNull();
  });

  it("displays optional body box when 'Add Body' is clicked in the options menu", async () => {
    const { getByText, getByTestId } = render(<RequestModule />);
    // Finding the button that shows the request options.
    const button = await waitForElement(() => getByText("Options"));

    // Clicking the options button.
    await wait(() => {
      fireEvent.click(button);
    });

    // Finding the button to add the request body.
    const headerButton = await waitForElement(() => getByText("Add Body"));
    // Clicking the button to add the request body.
    await wait(() => {
      fireEvent.click(headerButton);
    });

    expect(getByTestId("body-box")).not.toBeNull();
  });

  it("displays optional content box when clicked when 'Add Content' is clicked in the options menu", async () => {
    const { getByText, getByTestId } = render(<RequestModule />);
    // Finding the button that shows the request options.
    const button = await waitForElement(() => getByText("Options"));
    await wait(() => {
      fireEvent.click(button);
    });

    // Finding the button that adds content type.
    const headerButton = await waitForElement(() =>
      getByText("Add Content Type")
    );
    // Clicking the button that adds the content type.
    await wait(() => {
      fireEvent.click(headerButton);
    });

    expect(getByTestId("content-box")).not.toBeNull();
  });

  it("is submits form when URL, HTTP Method, and Token has been submitted", async () => {
    const { getByText, container, getByTestId } = render(<RequestModule />);
    // Finding button to submit request form.
    const button = await waitForElement(() => container.querySelector("Form"));
    // Finding the input for the token.
    const tokenInput = await waitForElement(() => getByTestId("token-field"));
    // Finding the input for the URL.
    const urlInput = await waitForElement(() => getByTestId("url-field"));
    // Finding the input for the HTTP method.
    const httpInput = await waitForElement(() => getByTestId("http-field"));

    // Entering the token.
    await wait(() => {
      fireEvent.change(tokenInput, {
        target: {
          value: "ya.testtoken",
        },
      });
    });

    // Entering the URL.
    await wait(() => {
      fireEvent.change(urlInput, {
        target: {
          value: "testurl",
        },
      });
    });

    // Entering the HTTP Method.
    await wait(() => {
      fireEvent.change(httpInput, {
        target: {
          value: "GET",
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
