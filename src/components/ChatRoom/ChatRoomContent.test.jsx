import React from "react";
import { shallow, configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import { ChatRoomContent } from "./ChatRoomContent.jsx";
import { ChatRoomContentSampleData } from "../../helpers/sample-data-test";

configure({ adapter: new Adapter() });

const postMessageSingleRoom = jest.fn();
const fetchSingleRoom = jest.fn();
const fetchSingleRoomMessages = jest.fn();
const updateActiveUsers = jest.fn();

describe("ChatRoomContent Component", () => {
  beforeEach(() => {});
  it("should render with testing data ", () => {
    const component = shallow(
      <ChatRoomContent
        currentUserName={"Nick"}
        postMessageSingleRoom={postMessageSingleRoom}
        fetchSingleRoom={fetchSingleRoom}
        fetchSingleRoomMessages={fetchSingleRoomMessages}
        messagesDetail={{ 0: [] }}
        activeRoom={{ id: 0, name: "", users: [] }}
        updateActiveUsers={updateActiveUsers}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it("Renders with correct classes", () => {
    const component = shallow(
      <ChatRoomContent
        currentUserName={"Nick"}
        postMessageSingleRoom={postMessageSingleRoom}
        fetchSingleRoom={fetchSingleRoom}
        fetchSingleRoomMessages={fetchSingleRoomMessages}
        messagesDetail={{ 0: [] }}
        activeRoom={{ id: 0, name: "", users: [] }}
        updateActiveUsers={updateActiveUsers}
      />
    );
    expect(component.find(".ChatRoomContent-messages").length).toBe(1);
    expect(component.find(".ChatRoomContent-inputBoxWrapper").length).toBe(1);
    expect(component.find(".ChatRoomContent-submitButton").length).toBe(1);
    expect(component.find(".ChatRoomContent").length).toBe(1);
  });

  it("functional test: simulate a input text and then expect the text show up on the chat room while scrolling down to the bottom of the chat", () => {
    const scrollIntoView = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoView;
    const inputBoxRef = jest.spyOn(React, "useRef");
    inputBoxRef.current = { scrollIntoView: scrollIntoView };

    const wrapper = mount(
      <ChatRoomContent
        currentUserName={"Nick"}
        postMessageSingleRoom={postMessageSingleRoom}
        fetchSingleRoom={fetchSingleRoom}
        fetchSingleRoomMessages={fetchSingleRoomMessages}
        messagesDetail={ChatRoomContentSampleData.messagesDetail}
        activeRoom={ChatRoomContentSampleData.activeRoom}
        updateActiveUsers={updateActiveUsers}
      />
    );

    const input = wrapper.find("InputBox");
    const button = wrapper.find(".ChatRoomContent-submitButton");

    input.simulate("change", {
      target: { value: "I am typing something here" },
    });
    button.simulate("click");

    expect(inputBoxRef.current.scrollIntoView).toHaveBeenCalledTimes(1);
    expect(wrapper.find(".ChatRoomContent-messages").length).toBe(1);
    expect(wrapper.find(".Message-body").length).toBe(6);
    expect(wrapper.text().includes("I am typing something here")).toBe(true);
  });
});
