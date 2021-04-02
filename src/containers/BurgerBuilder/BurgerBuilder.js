import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "./../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

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
    ingredients: null,
    totalPrice: 0,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false,
  };
  componentDidMount() {
    axios
      .get(
        "https://react-burger-builder-d09b4-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((Response) => {
        this.setState({ ingredients: Response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
    // console.log(this.state.ingredients);
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
    this.setState(
      { purchaseable: sum > 0 }
      //purchaseable is true/false
    );
  }
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };
  /*********** */
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    // alert("You continue !");

    //Passing Ingredients Via Query Params
    const queryParamas = [];
    for (let i in this.state.ingredients) {
      queryParamas.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
      // porperty name = poperty value
      //ex: meat = 2
    }

    //Push TotalPrice to checkout because we need it int Contact-Data (OrderHandler())
    queryParamas.push("price=" + this.state.totalPrice);

    const queryString = queryParamas.join("&");

    //Routes us into the checkout component(because we choose to render the checkout component in the SWITCH Route in the app.js)
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };
  /***** */
  render() {
    const disabledInfo = {
      ...this.state.ingredients,
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

    if (this.state.ingredients) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.state.ingredients} />
          {console.log(this.state.ingredients)}
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemove={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            ordered={this.purchaseHandler}
          />
        </Auxiliary>
      );

      orderSummury = (
        <OrderSummary
          // key={this.props.key}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);
