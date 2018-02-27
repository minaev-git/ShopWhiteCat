import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import CategoryPage from "./category/Category";
import Product from "./product/Product";
import CartPage from "./cartPage/CartPage";
import styles from "./styles/Main.css"

const Main = () => (
  <div className={styles.mainPage}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/product/:name/:id" component={Product} />
      <Route path="/category/:name/:id" component={CategoryPage} />
      <Route path="/cart" component={CartPage} />
    </Switch>
  </div>
);

export default Main;
