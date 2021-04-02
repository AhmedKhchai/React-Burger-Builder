import React from "react";
// import classes from "./../SideDrawer/SideDrawer.module.css";
import classes from "./NavigationToggle.module.css";

//this component is suppesed to be a Drawer toggle
const navigationToggle = (props) => {
  return (
    <div className={classes.NavigationToggle} onClick={props.toggle}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default navigationToggle;
