import * as actionTypes from "./action.js";

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 4,
};
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      return {
        //   new version of the state with updated ingredients
        ...state,
        ingredients: {
          //   we spread the ingredients object
          ...state.ingredients,
          //   assign new values using the folowing syntax
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        // overriding the totalprice
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };
    case actionTypes.REMOVE_INGREDIENTS:
      return {
        //   new version of the state with updated ingredients
        ...state,
        ingredients: {
          //   we spread the ingredients object
          ...state.ingredients,
          //   assign new values using the folowing syntax
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
          // overriding the totalprice
          totalPrice:
            state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        },
      };
    default:
      return state;
  }
};

export default reducer;
