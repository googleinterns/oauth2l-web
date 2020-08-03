import React from "react";
import {
  fireEvent,
  waitForElement,
  render,
  wait,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { TokenForm } from "../components";

describe("Token Form Component", () => {
  it("renders the page", () => {
    const wrapper = render(<TokenForm />);
    expect(wrapper).toBeDefined();
  });

  it("will not continue if token type and token format is not selected", async () => {
    const { getByText, container } = render(<TokenForm />);
    // Finding the button to go to next step in getting a token.
    const button = await waitForElement(() => container.querySelector("Form"));

    // Clicking button to go to the token access step.
    await wait(() => {
      fireEvent.submit(button);
    });

    expect(getByText("Must select a token type")).not.toBeNull();
    expect(getByText("Must select a token format")).not.toBeNull();
  });

  it("renders scopes step if token type and token format has been entered and token type is OAuth", async () => {
    const { getByText, container, getByLabelText } = render(<TokenForm />);
    // Selecting OAuth for the token type.
    const typeInput = await waitForElement(() => getByLabelText("OAuth"));
    // Selecting Bare for the token format.
    const inputFormat = await waitForElement(() => getByLabelText("Bare"));
    // Finding the button to go to next step in getting a token.
    const button = await waitForElement(() => container.querySelector("Form"));

    // Selecting the token type.
    await wait(() => {
      fireEvent.click(typeInput);
    });

    // Selecting the token format.
    await wait(() => {
      fireEvent.click(inputFormat);
    });

    // Clicking button to go to the token access step.
    await wait(() => {
      fireEvent.submit(button);
    });

    expect(getByText("Enter scopes")).not.toBeNull();
  });

  it("renders enter audience step if token type and token format has been entered and token type is JWT", async () => {
    const { getByText, container, getByLabelText } = render(<TokenForm />);
    // Selecting token type to be JWT.
    const inputType = await waitForElement(() => getByLabelText("JWT"));
    // Selecting the token format to be Bare.
    const inputFormat = await waitForElement(() => getByLabelText("Bare"));
    // Finding the button to go to next step in getting a token.
    const button = await waitForElement(() => container.querySelector("Form"));

    // Selecting the token type.
    await wait(() => {
      fireEvent.click(inputType);
    });

    // Selecting the token format.
    await wait(() => {
      fireEvent.click(inputFormat);
    });

    // Clicking button to go to the token access step.
    await wait(() => {
      fireEvent.submit(button);
    });

    expect(getByText("Enter audience")).not.toBeNull();
  });

  it("will not continue if scopes has not been entered when token type is OAuth", async () => {
    const { container, getByLabelText, getByText } = render(<TokenForm />);
    // Selecting the token type to be OAuth.
    const inputType = await waitForElement(() => getByLabelText("OAuth"));
    // Selecting the token format to be bare.
    const inputFormat = await waitForElement(() => getByLabelText("Bare"));
    // Finding the button to go to next step in getting a token.
    const button = await waitForElement(() => container.querySelector("Form"));

    // Selecting the token type.
    await wait(() => {
      fireEvent.click(inputType);
    });

    // Selecting the token format.
    await wait(() => {
      fireEvent.click(inputFormat);
    });

    // Pressing button to go to the token access step.
    await wait(() => {
      fireEvent.submit(button);
    });

    // Pressing button to go to the token credentials step.
    await wait(() => {
      fireEvent.submit(button);
    });

    expect(getByText("Must include scopes")).not.toBeNull();
  });

  it("will not continue if audience has not been entered when token type is JWT", async () => {
    const { container, getByLabelText, getByText } = render(<TokenForm />);
    // Selecting token type to be JWT.
    const inputType = await waitForElement(() => getByLabelText("JWT"));
    // Selecting token format to be Bare.
    const inputFormat = await waitForElement(() => getByLabelText("Bare"));
    // Finding button to go on to the next step of getting a token.
    const button = await waitForElement(() => container.querySelector("Form"));

    // Selecting token type.
    await wait(() => {
      fireEvent.click(inputType);
    });

    // Selecting token format.
    await wait(() => {
      fireEvent.click(inputFormat);
    });

    // Clicking on button to go on the token access step.
    await wait(() => {
      fireEvent.submit(button);
    });

    // Clicking on button to go on to the token credentials step.
    await wait(() => {
      fireEvent.submit(button);
    });

    expect(getByText("Must include audience")).not.toBeNull();
  });

  it("will continue if scopes has been entered", async () => {
    const { container, getByLabelText, getByText, getByRole } = render(
      <TokenForm />
    );
    // Selecting token type to be OAuth.
    const inputType = await waitForElement(() => getByLabelText("OAuth"));
    // Selecting token type to be Bare.
    const inputFormat = await waitForElement(() => getByLabelText("Bare"));
    // Finding the button to be clicked to go to the next step of getting a token.
    const button = await waitForElement(() => container.querySelector("Form"));

    // Selecting token input.
    await wait(() => {
      fireEvent.click(inputType);
    });

    // Selecting token format.
    await wait(() => {
      fireEvent.click(inputFormat);
    });

    // Clicking button to go to the token access step.
    await wait(() => {
      fireEvent.submit(button);
    });

    // Finding textbox to input the scopes.
    const scopesInput = await waitForElement(() => getByRole("textbox"));

    // Pressing the key "a" in the textbox
    await wait(() => {
      fireEvent.change(scopesInput, { target: { value: "a" } });
    });

    // Pressing the down key in the autocomplete popup.
    await wait(() => {
      fireEvent.keyDown(scopesInput, { key: "ArrowDown" });
    });

    // Pressing enter key to select scope.
    await wait(() => {
      fireEvent.keyDown(scopesInput, { key: "Enter" });
    });

    // Pressing the button to go on to the token credentials step.
    await wait(() => {
      fireEvent.submit(button);
    });

    expect(getByText("Upload or enter credentials")).not.toBeNull();
  });

  it("will show an error if credentials has not been entered", async () => {
    const { container, getByLabelText, getByText, getByRole } = render(
      <TokenForm />
    );
    // Selecting token type to be JWT.
    const inputType = await waitForElement(() => getByLabelText("JWT"));
    // Selecting token format to be Bare.
    const inputFormat = await waitForElement(() => getByLabelText("Bare"));
    // Finding button to go on to the next step of getting a token.
    const button = await waitForElement(() => container.querySelector("Form"));

    // Selecting token type.
    await wait(() => {
      fireEvent.click(inputType);
    });

    // Selecting token format.
    await wait(() => {
      fireEvent.click(inputFormat);
    });

    // Clicking button to go to the token access step.
    await wait(() => {
      fireEvent.submit(button);
    });

    // Finding text box to enter audience.
    const audienceInput = await waitForElement(() => getByRole("textbox"));

    // Entering audience.
    await wait(() => {
      fireEvent.change(audienceInput, {
        target: { value: "testaudience" },
      });
    });

    // Clicking button to go to the token credentials step.
    await wait(() => {
      fireEvent.submit(button);
    });

    // Selecting to input credentials as text.
    const credentialsSelect = await waitForElement(() =>
      getByLabelText("Text input")
    );

    // Selecting method to input credentials.
    await wait(() => {
      fireEvent.click(credentialsSelect);
    });

    // Clicking button to get the token.
    await wait(() => {
      fireEvent.submit(button);
    });

    expect(getByText("Must include credential")).not.toBeNull();
  });

  it("it will show an error if inputted credentials are not in JSON format", async () => {
    const {
      container,
      getByLabelText,
      getByRole,
      queryByText,
      getByTestId,
    } = render(<TokenForm />);

    // Selecting token type to be OAuth.
    const inputType = await waitForElement(() => getByLabelText("OAuth"));
    // Selecting token format to be Bare.
    const inputFormat = await waitForElement(() => getByLabelText("Bare"));
    // Finding the button to be clicked to go to the next step of getting a token.
    const button = await waitForElement(() => container.querySelector("Form"));

    // Selecting token type.
    await wait(() => {
      fireEvent.click(inputType);
    });

    // Selecting token format.
    await wait(() => {
      fireEvent.click(inputFormat);
    });

    // Clicking button to go on to the token access step.
    await wait(() => {
      fireEvent.submit(button);
    });

   // Finding textbox to input the scopes.
   const scopesInput = await waitForElement(() => getByRole("textbox"));

   // Pressing the key "a" in the textbox
   await wait(() => {
     fireEvent.change(scopesInput, { target: { value: "a" } });
   });

   // Pressing the down key in the autocomplete popup.
   await wait(() => {
     fireEvent.keyDown(scopesInput, { key: "ArrowDown" });
   });

   // Pressing enter key to select scope.
   await wait(() => {
     fireEvent.keyDown(scopesInput, { key: "Enter" });
   });

   // Pressing the button to go on to the token credentials step.
   await wait(() => {
     fireEvent.submit(button);
   });


    // Selecting to input credentials as text.
    const credentialsSelect = await waitForElement(() =>
      getByLabelText("Text input")
    );

    // Selecting method to input credentials.
    await wait(() => {
      fireEvent.click(credentialsSelect);
    });

    // Finding textbox to input credentials.
    const credentialsInput = await waitForElement(() =>
      getByTestId("credentials-field")
    );

    // Inputting credentials. 
    await wait(() => {
      fireEvent.keyUp(credentialsInput, { key: "h" });
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

    // Selecting token type to be OAuth.
    const inputType = await waitForElement(() => getByLabelText("OAuth"));
    // Selecting token format to be Bare.
    const inputFormat = await waitForElement(() => getByLabelText("Bare"));
    // Finding the button to be clicked to go to the next step of getting a token.
    const button = await waitForElement(() => container.querySelector("Form"));

    
     // Selecting token type.
     await wait(() => {
      fireEvent.click(inputType);
    });

    // Selecting token format.
    await wait(() => {
      fireEvent.click(inputFormat);
    });

    // Clicking button to go on to the token access step.
    await wait(() => {
      fireEvent.submit(button);
    });

   // Finding textbox to input the scopes.
   const scopesInput = await waitForElement(() => getByRole("textbox"));

   // Pressing the key "a" in the textbox
   await wait(() => {
     fireEvent.change(scopesInput, { target: { value: "a" } });
   });

   // Pressing the down key in the autocomplete popup.
   await wait(() => {
     fireEvent.keyDown(scopesInput, { key: "ArrowDown" });
   });

   // Pressing enter key to select scope.
   await wait(() => {
     fireEvent.keyDown(scopesInput, { key: "Enter" });
   });

   // Pressing the button to go on to the token credentials step.
   await wait(() => {
     fireEvent.submit(button);
   });


    // Selecting to input credentials as text.
    const credentialsSelect = await waitForElement(() =>
      getByLabelText("Text input")
    );

    // Selecting method to input credentials.
    await wait(() => {
      fireEvent.click(credentialsSelect);
    });

    // Finding textbox to input credentials.
    const credentialsInput = await waitForElement(() =>
      getByTestId("credentials-field")
    );

    // Inputting credentials.
    await wait(() => {
      fireEvent.change(credentialsInput, {
        target: { value: JSON.stringify({ test: "test" }) },
      });
      fireEvent.keyUp(credentialsInput, { key: "Enter" });
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

    // Selecting token type to be OAuth.
    const inputType = await waitForElement(() => getByLabelText("OAuth"));
    // Selecting token format to be Bare.
    const inputFormat = await waitForElement(() => getByLabelText("Bare"));
    // Finding the button to be clicked to go to the next step of getting a token.
    const button = await waitForElement(() => container.querySelector("Form"));

    
     // Selecting token type.
     await wait(() => {
      fireEvent.click(inputType);
    });

    // Selecting token format.
    await wait(() => {
      fireEvent.click(inputFormat);
    });

    // Clicking button to go on to the token access step.
    await wait(() => {
      fireEvent.submit(button);
    });

   // Finding textbox to input the scopes.
   const scopesInput = await waitForElement(() => getByRole("textbox"));

   // Pressing the key "a" in the textbox
   await wait(() => {
     fireEvent.change(scopesInput, { target: { value: "a" } });
   });

   // Pressing the down key in the autocomplete popup.
   await wait(() => {
     fireEvent.keyDown(scopesInput, { key: "ArrowDown" });
   });

   // Pressing enter key to select scope.
   await wait(() => {
     fireEvent.keyDown(scopesInput, { key: "Enter" });
   });

   // Pressing the button to go on to the token credentials step.
   await wait(() => {
     fireEvent.submit(button);
   });


    // Selecting to input credentials as text.
    const credentialsSelect = await waitForElement(() =>
      getByLabelText("Text input")
    );

    // Selecting method to input credentials.
    await wait(() => {
      fireEvent.click(credentialsSelect);
    });

    // Finding textbox to input credentials.
    const credentialsInput = await waitForElement(() =>
      getByTestId("credentials-field")
    );

    // Inputting credentials.
    await wait(() => {
      fireEvent.change(credentialsInput, {
        target: { value: JSON.stringify({ test: "test" }) },
      });
      fireEvent.keyUp(credentialsInput, { key: "Enter" });
    });

    // Pressing button to get button.
    await act(async () => {
      fireEvent.submit(button);
    });

    expect(queryByText("Submitting")).not.toBeNull();
  });
});
