import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "./../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  // constructor(props){
  //   super(props);
  //   this.state ={}
  // }

  state = {
    // ingredients: null,
    // totalPrice: 0,
    // passed to burger controls to change the ui no need to add to the store
    // purchaseable: false,
    // used to show the modal
    purchasing: false,
    // show spinner
    // loading: false,
    // show error message
    // error: false,
  };
  componentDidMount() {
    // axios
    //   .get(
    //     "https://react-burger-builder-d09b4-default-rtdb.firebaseio.com/ingredients.json"
    //   )
    //   .then((Response) => {
    //     this.setState({ ingredients: Response.data });
    //   })
    //   .catch((error) => {
    //     this.setState({ error: true });
    //   });
    // console.log(this.state.ingredients);
    this.props.onInitIngredients();
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igkey) => {
        return ingredients[igkey];
        //returns the value of each ingredient
        //ig key = {salad , bacon ...}
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
    //purchaseable is true/false
  }
  /*********** */
  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    // alert("You continue !");

    //Passing Ingredients Via Query Params
    this.props.onInitPurchase();
    this.props.history.push("/checkout");

    //Push TotalPrice to checkout because we need it int Contact-Data (OrderHandler())
    // queryParamas.push("price=" + this.state.totalPrice);

    // const queryString = queryParamas.join("&");

    //Routes us into the checkout component(because we choose to render the checkout component in the SWITCH Route in the app.js)
    // this.props.history.push({
    //   pathname: "/checkout",
    //   search: "?" + queryString,
    // });
  };
  /***** */
  render() {
    const disabledInfo = {
      ...this.state.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    //{salad: true, meat: false , ...}
    //showing the spinner while pushing the order to the backend
    let orderSummury = null;

    // Showing the apinner while fetching the ingredients to avoid errors
    let burger = this.state.error ? (
      <p>Ingrdients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.state.ings) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.state.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemove={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            puchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            purchaseable={this.state.purchaseable}
            isAuth={this.props.isAuthenticated}
            price={this.props.price}
          />
        </Auxiliary>
      );

      orderSummury = (
        <OrderSummary
          // key={this.props.key}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.state.ings}
          price={this.state.price}
        />
      );
    }
    if (this.state.loading) {
      orderSummury = <Spinner />;
    }
    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummury}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}
// hold a function Recieve the state and return wich property should be where
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};
// make call to the store to get the updated props
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
