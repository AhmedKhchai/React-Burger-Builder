import reducer from "./order";
import * as actionTypes from "../actions/actionTypes";
// here i test synchronous reducers
// no need to for enzyme be cause we do not need to isolate and mount a react component
describe("Burger Builder reducer", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = reducer(
      {
        orders: [],
        loading: false,
        purchased: false,
      },
      {}
    );
  });

  // How to test reducers by putting the initial state
  it("should return the initial state", () => {
    expect(wrapper).toEqual({
      orders: [],
      loading: false,
      purchased: false,
    });
  });

  it("should return purchase Initialization", () => {
    expect(
      reducer(
        {
          orders: [],
          loading: false,
          purchased: false,
        },
        {
          type: actionTypes.PURCHASE_INIT,
        }
      )
    ).toEqual({
      orders: [],
      loading: false,
      purchased: false,
    });
  });

  it("should return loading false to start Burgur purchase", () => {
    expect(
      reducer(
        {
          orders: [],
          loading: false,
          purchased: false,
        },
        {
          type: actionTypes.PURCHASE_BURGER_START,
        }
      )
    ).toEqual({
      orders: [],
      loading: false,
      purchased: false,
    });
  });
});
