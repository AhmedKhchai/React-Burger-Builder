import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";
// here i test synchronous reducers
// no need to for enzyme be cause we do not need to isolate and mount a react component
describe("auth reducer", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = reducer(
      {
        token: null,
        userId: null,
        error: null,
        loading: false,
        authRedirectPath: "/",
      },
      {}
    );
  });

  // How to test reducers by putting the initial state
  it("should return the initial state", () => {
    expect(wrapper).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });

  it("should store the token upon login", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: "/",
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: "some-token",
          userId: "some-user-id",
        }
      )
    ).toEqual({
      token: "some-token",
      userId: "some-user-id",
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });

  it("should logout with token and id set to null", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: "/",
        },
        {
          type: actionTypes.AUTH_LOGOUT,
          token: null,
          userId: null,
        }
      )
    ).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });
});
