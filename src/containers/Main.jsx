import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import CategoryPage from "./category/Category";
import Product from "./product/Product";
import CartPage from "./cartPage/CartPage";

const SaleProduct = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route
      path="/category/:name/:id"
      render={props => <CategoryPage {...props} type="category" />}
    />
    <Route
      path="/subcategory/:name/:id"
      render={props => <CategoryPage {...props} type="childCategory" />}
    />
    <Route path="/product/:name/:id" component={Product} />
    <Route path="/cart" component={CartPage} />
  </Switch>
);

export default SaleProduct;
