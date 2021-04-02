import React from "react";
import Burger from "./../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";
const checkoutsummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
        {/* Burger doens't recieve an object named Ingredients:{{}} */}
        {/* But CheckoutSummary does recieve a object that contain ingredients.  */}
        {/* Possible fix: -pass props directly from BurgerBuilder to Burger, But then we would have to change the routing configs from App.js to BurgerBuilder
                          -Modify the process to convert an object to an array in Burger */}

        {console.log(props.ingredients)}
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};
export default checkoutsummary;
