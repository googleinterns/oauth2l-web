import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Scopes from "../components/Scopes";

Enzyme.configure({ adapter: new Adapter() });

// test applications use-cases from user's pov. Users access information on a web page and interact with available controls
// assert pm react dom state
// shallow rendering is not used for this as we need to be able to test the child components

describe("Scopes Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Scopes />);
  });

  it("renders the page", () => {
    expect(wrapper).toBeDefined();
  });
});
