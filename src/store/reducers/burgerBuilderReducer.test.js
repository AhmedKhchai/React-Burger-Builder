import reducer from "./burgerBuilder";
import * as actionTypes from "../actions/actionTypes";
// here i test synchronous reducers
// no need to for enzyme be cause we do not need to isolate and mount a react component
describe("Burger Builder reducer", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = reducer(
      {
        ingredients: null,
        totalPrice: 4,
        error: false,
        building: false,
      },
      {}
    );
  });

  // How to test reducers by putting the initial state
  it("should return the initial state", () => {
    expect(wrapper).toEqual({
      ingredients: null,
      totalPrice: 4,
      error: false,
      building: false,
    });
  });

  it("should return errors true on fetch Ingredients Failed", () => {
    expect(
      reducer(
        {
          ingredients: null,
          totalPrice: 4,
          error: false,
          building: false,
        },
        {
          type: actionTypes.FETCH_INGREDIENTS_FAILED,
        }
      )
    ).toEqual({
      ingredients: null,
      totalPrice: 4,
      error: true,
      building: false,
    });
  });
});
