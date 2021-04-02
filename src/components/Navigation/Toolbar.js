import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "./../Logo/Logo";
import NavigationItems from "../Navigation/NavigationItems/NavigationItems";
import NavigationToggle from "./NavigationToggle/NavigationToggle";
const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <div>
      <NavigationToggle toggle={props.toggle} />
    </div>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
