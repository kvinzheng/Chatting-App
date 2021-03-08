import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import ChatRoom from "./index";

configure({ adapter: new Adapter() });

describe("ChatRoom Component", () => {
  it("should render without any data defined", () => {
    const component = shallow(<ChatRoom />);
    expect(component).toMatchSnapshot();
  });
});
