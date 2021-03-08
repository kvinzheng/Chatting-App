import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { LOGIN } from "../../actions/type";
import { Login } from "./Login.jsx";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

configure({ adapter: new Adapter() });

const userLogin = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe("Login Component", () => {
  const component = mount(<Login userLogin={userLogin} />);
  it("should render with testing data ", () => {
    expect(component).toMatchSnapshot();
  });
  it("shouldn't go to another page when click given no input", () => {
    component.find(".Login-button-submit").simulate("click");
    expect(global.window.location.pathname).toEqual("/");
  });
});
