import React from "react";
import {
  fireEvent,
  waitForElement,
  render,
  wait,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { TokenForm } from "../components";

// test applications use-cases from user's pov. Users access information on a web page and interact with available controls
// assert pm react dom state
// shallow rendering is not used for this as we need to be able to test the child components

describe("Token Form Component", () => {
  it("renders the page", () => {
    const wrapper = render(<TokenForm />);
    expect(wrapper).toBeDefined();
  });

  it("will not continue if token type and token format is not selected", async () => {
    const { getByText, container } = render(<TokenForm />);

    const button = await waitForElement(() => container.querySelector("Form"));

    await wait(() => {
      fireEvent.submit(button);
    });

    expect(getByText("Must select a token type")).not.toBeNull();
    expect(getByText("Must select a token format")).not.toBeNull();
  });

  it("renders enter scopes component if token type and token format has been entered and token type is OAuth", async () => {
    const { getByText, container, getByLabelText } = render(<TokenForm />);
    const TypeInput = await waitForElement(() => getByLabelText("OAuth"));
    const FormatInput = await waitForElement(() => getByLabelText("Bare"));
    const button = await waitForElement(() => container.querySelector("Form"));

    await wait(() => {
      fireEvent.click(TypeInput);
    });

    await wait(() => {
      fireEvent.click(FormatInput);
    });

    await wait(() => {
      fireEvent.submit(button);
    });

    expect(getByText("Enter scopes")).not.toBeNull();
  });

  it("renders enter scopes component if token type and token format has been entered and token type is OAuth", async () => {
    const { getByText, container, getByLabelText } = render(<TokenForm />);
    const TypeInput = await waitForElement(() => getByLabelText("JWT"));
    const FormatInput = await waitForElement(() => getByLabelText("Bare"));
    const button = await waitForElement(() => container.querySelector("Form"));

    await wait(() => {
      fireEvent.click(TypeInput);
    });

    await wait(() => {
      fireEvent.click(FormatInput);
    });

    await wait(() => {
      fireEvent.submit(button);
    });

    expect(getByText("Enter audience")).not.toBeNull();
  });

  it("will not continue if scopes has not been entered", async () => {
    const { container, getByLabelText, getByText } = render(<TokenForm />);
    const TypeInput = await waitForElement(() => getByLabelText("OAuth"));
    const FormatInput = await waitForElement(() => getByLabelText("Bare"));
    const button = await waitForElement(() => container.querySelector("Form"));

    await wait(() => {
      fireEvent.click(TypeInput);
    });

    await wait(() => {
      fireEvent.click(FormatInput);
    });

    await wait(() => {
      fireEvent.submit(button);
    });

    await wait(() => {
      fireEvent.submit(button);
    });

    expect(getByText("Must include scopes")).not.toBeNull();
  });

  it("will not continue if audience has not been entered", async () => {
    const { container, getByLabelText, getByText } = render(<TokenForm />);
    const TypeInput = await waitForElement(() => getByLabelText("JWT"));
    const FormatInput = await waitForElement(() => getByLabelText("Bare"));
    const button = await waitForElement(() => container.querySelector("Form"));

    await wait(() => {
      fireEvent.click(TypeInput);
    });

    await wait(() => {
      fireEvent.click(FormatInput);
    });

    await wait(() => {
      fireEvent.submit(button);
    });

    await wait(() => {
      fireEvent.submit(button);
    });

    expect(getByText("Must include audience")).not.toBeNull();
  });

  it("will continue if scopes has been entered", async () => {
    const { container, getByLabelText, getByText, getByRole } = render(
      <TokenForm />
    );
    const TypeInput = await waitForElement(() => getByLabelText("OAuth"));
    const FormatInput = await waitForElement(() => getByLabelText("Bare"));
    const button = await waitForElement(() => container.querySelector("Form"));

    await wait(() => {
      fireEvent.click(TypeInput);
    });

    await wait(() => {
      fireEvent.click(FormatInput);
    });

    await wait(() => {
      fireEvent.submit(button);
    });

    const ScopesInput = await waitForElement(() => getByRole("textbox"));

    await wait(() => {
      fireEvent.change(ScopesInput, { target: { value: "a" } });
    });

    await wait(() => {
      fireEvent.keyDown(ScopesInput, { key: "ArrowDown" });
    });

    await wait(() => {
      fireEvent.keyDown(ScopesInput, { key: "Enter" });
    });

    await wait(() => {
      fireEvent.submit(button);
    });

    expect(getByText("Upload or enter credentials")).not.toBeNull();
  });

  it("will not continue if credentials has not been entered", async () => {
    const { container, getByLabelText, getByText, getByRole } = render(
      <TokenForm />
    );
    const TypeInput = await waitForElement(() => getByLabelText("JWT"));
    const FormatInput = await waitForElement(() => getByLabelText("Bare"));
    const button = await waitForElement(() => container.querySelector("Form"));

    await wait(() => {
      fireEvent.click(TypeInput);
    });

    await wait(() => {
      fireEvent.click(FormatInput);
    });

    await wait(() => {
      fireEvent.submit(button);
    });

    const ScopesInput = await waitForElement(() => getByRole("textbox"));

    await wait(() => {
      fireEvent.change(ScopesInput, {
        target: { value: "testaudience" },
      });
    });

    await wait(() => {
      fireEvent.submit(button);
    });

    await wait(() => {
      fireEvent.submit(button);
    });

    expect(getByText("Upload or enter credentials")).not.toBeNull();
    expect(getByText("Get Token")).not.toBeNull();
  });

  it("will show an error if inputted credentials is not in JSON format", async () => {
    const { container, getByLabelText, getByRole, queryByText } = render(
      <TokenForm />
    );
    const TypeInput = await waitForElement(() => getByLabelText("OAuth"));
    const FormatInput = await waitForElement(() => getByLabelText("Bare"));
    const button = await waitForElement(() => container.querySelector("Form"));

    await wait(() => {
      fireEvent.click(TypeInput);
    });

    await wait(() => {
      fireEvent.click(FormatInput);
    });

    await wait(() => {
      fireEvent.submit(button);
    });

    const ScopesInput = await waitForElement(() => getByRole("textbox"));

    await wait(() => {
      fireEvent.change(ScopesInput, { target: { value: "a" } });
    });

    await wait(() => {
      fireEvent.keyDown(ScopesInput, { key: "ArrowDown" });
    });

    await wait(() => {
      fireEvent.keyDown(ScopesInput, { key: "Enter" });
    });

    await wait(() => {
      fireEvent.submit(button);
    });

    const CredentialsSelect = await waitForElement(() =>
      getByLabelText("Text input")
    );

    await wait(() => {
      fireEvent.click(CredentialsSelect);
    });

    await wait(() => {
      fireEvent.submit(button);
    });

    expect(queryByText("Must include credential")).not.toBeNull();
  });

  it("it will show an error if inputted credentials are not in JSON format", async () => {
    const {
      container,
      getByLabelText,
      getByRole,
      queryByText,
      getByTestId,
    } = render(<TokenForm />);

    const TypeInput = await waitForElement(() => getByLabelText("OAuth"));
    const FormatInput = await waitForElement(() => getByLabelText("Bare"));
    const button = await waitForElement(() => container.querySelector("Form"));

    await wait(() => {
      fireEvent.click(TypeInput);
    });

    await wait(() => {
      fireEvent.click(FormatInput);
    });

    await wait(() => {
      fireEvent.submit(button);
    });

    const ScopesInput = await waitForElement(() => getByRole("textbox"));

    await wait(() => {
      fireEvent.change(ScopesInput, { target: { value: "a" } });
    });

    await wait(() => {
      fireEvent.keyDown(ScopesInput, { key: "ArrowDown" });
    });

    await wait(() => {
      fireEvent.keyDown(ScopesInput, { key: "Enter" });
    });

    await wait(() => {
      fireEvent.submit(button);
    });

    const CredentialsSelect = await waitForElement(() =>
      getByLabelText("Text input")
    );

    await wait(() => {
      fireEvent.click(CredentialsSelect);
    });

    const CredentialsInput = await waitForElement(() =>
      getByTestId("credentials-field")
    );

    await wait(() => {
      fireEvent.keyUp(CredentialsInput, { key: "h" });
    });

    expect(queryByText("Unable to parse JSON")).not.toBeNull();
  });

  it("it will not show an error if inputted credentials are in JSON format", async () => {
    const {
      container,
      getByLabelText,
      getByRole,
      queryByText,
      getByTestId,
    } = render(<TokenForm />);

    const TypeInput = await waitForElement(() => getByLabelText("OAuth"));
    const FormatInput = await waitForElement(() => getByLabelText("Bare"));
    const button = await waitForElement(() => container.querySelector("Form"));

    await wait(() => {
      fireEvent.click(TypeInput);
    });

    await wait(() => {
      fireEvent.click(FormatInput);
    });

    await wait(() => {
      fireEvent.submit(button);
    });

    const ScopesInput = await waitForElement(() => getByRole("textbox"));

    await wait(() => {
      fireEvent.change(ScopesInput, { target: { value: "a" } });
    });

    await wait(() => {
      fireEvent.keyDown(ScopesInput, { key: "ArrowDown" });
    });

    await wait(() => {
      fireEvent.keyDown(ScopesInput, { key: "Enter" });
    });

    await wait(() => {
      fireEvent.submit(button);
    });

    const CredentialsSelect = await waitForElement(() =>
      getByLabelText("Text input")
    );

    await wait(() => {
      fireEvent.click(CredentialsSelect);
    });

    const CredentialsInput = await waitForElement(() =>
      getByTestId("credentials-field")
    );

    await wait(() => {
      fireEvent.change(CredentialsInput, {
        target: { value: JSON.stringify({ test: "test" }) },
      });
      fireEvent.keyUp(CredentialsInput, { key: "Enter" });
    });

    expect(queryByText("Credentials ready")).not.toBeNull();
  });

  it("it will submit form when credentials has been entered.", async () => {
    const {
      container,
      getByLabelText,
      getByRole,
      queryByText,
      getByTestId,
    } = render(<TokenForm />);

    const TypeInput = await waitForElement(() => getByLabelText("OAuth"));
    const FormatInput = await waitForElement(() => getByLabelText("Bare"));
    const button = await waitForElement(() => container.querySelector("Form"));

    await wait(() => {
      fireEvent.click(TypeInput);
    });

    await wait(() => {
      fireEvent.click(FormatInput);
    });

    await wait(() => {
      fireEvent.submit(button);
    });

    const ScopesInput = await waitForElement(() => getByRole("textbox"));

    await wait(() => {
      fireEvent.change(ScopesInput, { target: { value: "a" } });
    });

    await wait(() => {
      fireEvent.keyDown(ScopesInput, { key: "ArrowDown" });
    });

    await wait(() => {
      fireEvent.keyDown(ScopesInput, { key: "Enter" });
    });

    await wait(() => {
      fireEvent.submit(button);
    });

    const CredentialsSelect = await waitForElement(() =>
      getByLabelText("Text input")
    );

    await wait(() => {
      fireEvent.click(CredentialsSelect);
    });

    const CredentialsInput = await waitForElement(() =>
      getByTestId("credentials-field")
    );

    await wait(() => {
      fireEvent.change(CredentialsInput, {
        target: { value: JSON.stringify({ test: "test" }) },
      });
      fireEvent.keyUp(CredentialsInput, { key: "Enter" });
    });

    await act(async () => {
      fireEvent.submit(button);
    });

    expect(queryByText("Submitting")).not.toBeNull();
  });
});
