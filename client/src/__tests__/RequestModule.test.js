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
    const button = await waitForElement(() => container.querySelector("Form"));

    await wait(() => {
      fireEvent.submit(button);
    });

    expect(getByText("Token required.")).not.toBeNull();
    expect(getByText("HTTP method required.")).not.toBeNull();
    expect(getByText("URL required.")).not.toBeNull();
  });

  it("displays optional dialog box when clicked", async () => {
    const { getByText, getByTestId } = render(<RequestModule />);
    const button = await waitForElement(() => getByText("Options"));
    await wait(() => {
      fireEvent.click(button);
    });
    expect(getByTestId("option-menu")).not.toBeNull();
  });

  it("displays optional header box when clicked", async () => {
    const { getByText, getByTestId } = render(<RequestModule />);
    const button = await waitForElement(() => getByText("Options"));
    await wait(() => {
      fireEvent.click(button);
    });
    const headerButton = await waitForElement(() => getByText("Add Header"));
    await wait(() => {
      fireEvent.click(headerButton);
    });
    expect(getByTestId("header-box")).not.toBeNull();
  });

  it("displays optional body box when clicked", async () => {
    const { getByText, getByTestId } = render(<RequestModule />);
    const button = await waitForElement(() => getByText("Options"));
    await wait(() => {
      fireEvent.click(button);
    });
    const headerButton = await waitForElement(() => getByText("Add Body"));
    await wait(() => {
      fireEvent.click(headerButton);
    });
    expect(getByTestId("body-box")).not.toBeNull();
  });

  it("displays optional content box when clicked", async () => {
    const { getByText, getByTestId } = render(<RequestModule />);
    const button = await waitForElement(() => getByText("Options"));
    await wait(() => {
      fireEvent.click(button);
    });
    const headerButton = await waitForElement(() =>
      getByText("Add Content Type")
    );
    await wait(() => {
      fireEvent.click(headerButton);
    });
    expect(getByTestId("content-box")).not.toBeNull();
  });

  it("is submits form when URL, HTTP Method, and Token has been submitted", async () => {
    const { getByText, container, getByTestId } = render(<RequestModule />);
    const button = await waitForElement(() => container.querySelector("Form"));
    const Tokeninput = await waitForElement(() => getByTestId("token-field"));
    const URLinput = await waitForElement(() => getByTestId("url-field"));
    const HTTPinput = await waitForElement(() => getByTestId("http-field"));

    await wait(() => {
      fireEvent.change(Tokeninput, {
        target: {
          value: "ya.testtoken",
        },
      });
    });

    await wait(() => {
      fireEvent.change(URLinput, {
        target: {
          value: "testurl",
        },
      });
    });

    await wait(() => {
      fireEvent.change(HTTPinput, {
        target: {
          value: "GET",
        },
      });
    });

    await act(async () => {
      fireEvent.submit(button);
    });

    expect(getByText("Submitting")).not.toBeNull();
  });
});
