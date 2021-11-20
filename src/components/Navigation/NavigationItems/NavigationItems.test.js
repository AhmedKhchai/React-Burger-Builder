import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({ adapter: new Adapter() });

// connects enzyme to isolate the the Navigationitems component
describe("<NavigationItems />", () => {
  let wrapper;
  beforeEach(() => {
    //   Shallow: Mount the component
    wrapper = shallow(<NavigationItems />);
  });

  it("should render two <NavigationItem /> elements if not authenticated", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("should render three <NavigationItem /> elements if authenticated", () => {
    //wrapper = shallow(<NavigationItems isAuthenticated />);
    // passing props through setprops the wrapper
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it("should have a route /logout if authenticated", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(
      wrapper.contains(<NavigationItem item="Logout" link="/logout" />)
    ).toEqual(true);
  });
});
