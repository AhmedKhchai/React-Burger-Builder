import React from "react";
// import { withRouter } from "react-router-dom";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
const burger = (props) => {
  // let transformedIngredients = Object.keys(
  //   props.ingredients
  // ).map((igKey, i) => <BurgerIngredient key={igKey + i} type={igKey} />);

  // turn an object into a react array
  // const map = { a: 1, b: 2, c: 3 };
  // const result = Object.keys(map).map((key) => map[key]);
  // console.log(result);

  // Transform an object to an array
  console.log(props);
  let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

// i could take withrouter off
export default burger;
