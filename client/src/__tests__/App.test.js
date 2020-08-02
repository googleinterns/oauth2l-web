import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

describe("Main Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(<App />);
  });

  it("renders the page", () => {
    expect(wrapper).toBeDefined();
  });
});
